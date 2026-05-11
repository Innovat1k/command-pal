import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import App from "../App";
import { DEFAULT_ACTIONS } from "../lib/commands";

type MockAction = {
  id: string;
  label: string;
  shortcut: string;
  category: string;
  execute: ReturnType<typeof vi.fn>;
};

vi.mock("../lib/commands", () => ({
  DEFAULT_ACTIONS: [
    {
      id: "1",
      label: "Toggle Theme",
      shortcut: "⌘T",
      category: "settings",
      execute: vi.fn(),
    },
    {
      id: "2",
      label: "Go to Dashboard",
      shortcut: "D",
      category: "navigation",
      execute: vi.fn(),
    },
    {
      id: "3",
      label: "Copy URL",
      shortcut: "⌘C",
      category: "action",
      execute: vi.fn(),
    },
  ],
}));

describe("CmdPalOverlay Integration", () => {
  const user: UserEvent = userEvent.setup();

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("Dialog", () => {
    it("opens with Ctrl+K and auto-focuses input", async () => {
      render(<App />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      await user.keyboard("{Control>}k{/Control}");

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/type a command/i)).toHaveFocus();
    });

    it("closes with Escape key", async () => {
      render(<App />);
      await user.keyboard("{Control>}k{/Control}");
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("filters list when typing", async () => {
      render(<App />);
      await user.keyboard("{Control>}k{/Control}");

      expect(screen.getByText(/Toggle Theme/i)).toBeInTheDocument();
      expect(screen.getByText(/Go to Dashboard/i)).toBeInTheDocument();

      const input = screen.getByPlaceholderText(/type a command/i);
      await user.type(input, "dash");

      await waitFor(() => {
        expect(screen.queryByText(/Toggle Theme/i)).not.toBeInTheDocument();
        expect(screen.getByText("Go to Dashboard")).toBeInTheDocument();
      });
    });

    it("traps focus within overlay and restores on close", async () => {
      render(
        <>
          <button id="trigger">Trigger</button>
          <App />
        </>,
      );

      const triggerBtn = screen.getByRole("button", {
        name: /trigger/i,
      });

      triggerBtn.focus();

      await user.keyboard("{Control>}k{/Control}");

      expect(screen.getByRole("combobox")).toHaveFocus();

      console.log(document.activeElement);

      expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(
        true,
      );

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
      expect(document.activeElement).toBe(triggerBtn);
    });
  });

  describe("Keyboard", () => {
    it("navigates list with Arrow keys and executes with Enter", async () => {
      render(<App />);
      await user.keyboard("{Control>}k{/Control}");

      const options = screen.getAllByRole("option");

      expect(options[0]).toHaveAttribute("aria-selected", "true");

      await user.keyboard("{ArrowDown}");
      await waitFor(() => {
        expect(options[1]).toHaveAttribute("aria-selected", "true");
        expect(options[0]).toHaveAttribute("aria-selected", "false");
      });

      await user.keyboard("{Enter}");
      await waitFor(() => {
        expect((DEFAULT_ACTIONS[1] as MockAction).execute).toHaveBeenCalled();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("connects the combobox to the active option", async () => {
      render(<App />);

      await user.keyboard("{Control>}k{/Control}");

      const input = screen.getByRole("combobox");

      expect(input).toHaveAttribute("aria-controls", "cmd-list");

      expect(input).toHaveAttribute("aria-expanded", "true");

      const options = screen.getAllByRole("option");

      expect(options.length).toBeGreaterThan(0);

      const selectedOption = options.find(
        (option) => option.getAttribute("aria-selected") === "true",
      );

      expect(selectedOption).toBeDefined();

      const activeDescendant = input.getAttribute("aria-activedescendant");

      expect(activeDescendant).toBeTruthy();

      expect(selectedOption?.id).toBe(activeDescendant);
    });
  });
});
