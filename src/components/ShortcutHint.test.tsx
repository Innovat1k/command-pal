import { render, screen } from "@testing-library/react";
import { ShortcutHint } from "../components/ShortcutHint";

describe("ShortcutHint", () => {
  const originalPlatform = navigator.platform;
  const originalUserAgent = navigator.userAgent;

  // Helpers to mock the OS
  const mockPlatform = (platform: string, userAgent?: string) => {
    Object.defineProperty(navigator, "platform", {
      value: platform,
      configurable: true,
    });
    if (userAgent) {
      Object.defineProperty(navigator, "userAgent", {
        value: userAgent,
        configurable: true,
      });
    }
  };

  afterEach(() => {
    // Restore originals
    Object.defineProperty(navigator, "platform", {
      value: originalPlatform,
      configurable: true,
    });
    Object.defineProperty(navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it("renders nothing when no value", () => {
    const { container } = render(<ShortcutHint />);
    expect(container.firstChild).toBeNull();
  });

  it("renders single key uppercase", () => {
    render(<ShortcutHint value="k" />);
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("splits and renders compound shortcut", () => {
    render(<ShortcutHint value="Ctrl+K" />);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("accepts array format", () => {
    render(<ShortcutHint value={["Shift", "Alt", "F"]} />);
    expect(screen.getByText("Shift")).toBeInTheDocument();
    expect(screen.getByText("Alt")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
  });

  it("displays Mac symbols on Mac platform", () => {
    mockPlatform("MacIntel", "Mozilla/5.0 (Macintosh; Intel Mac OS X)");
    render(<ShortcutHint value="Cmd+K" />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("displays Windows labels on Windows platform", () => {
    mockPlatform("Win32", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    render(<ShortcutHint value="Ctrl+K" />);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("normalizes modifier aliases", () => {
    mockPlatform("MacIntel");
    const { rerender } = render(<ShortcutHint value="Command+Shift+P" />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("⇧")).toBeInTheDocument();

    rerender(<ShortcutHint value="Meta+Shift+P" />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
  });

  it("renders arrow symbols", () => {
    render(<ShortcutHint value="ArrowUp" />);
    expect(screen.getByText("↑")).toBeInTheDocument();
  });
});
