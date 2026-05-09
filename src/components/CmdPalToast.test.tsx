import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CmdPalToast } from "../components/CmdPalToast";

describe("CmdPalToast", () => {
  it("renders toast message", () => {
    render(
      <CmdPalToast
        toast={{ id: "1", message: "Copied URL", type: "success" }}
        onClose={() => {}}
      />,
    );
    expect(screen.getByText("Copied URL")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const mockClose = vi.fn();
    render(
      <CmdPalToast toast={{ id: "1", message: "Test" }} onClose={mockClose} />,
    );
    await userEvent.click(screen.getByLabelText("Close notification"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('sets aria-live="polite" for screen readers', () => {
    render(
      <CmdPalToast toast={{ id: "1", message: "Test" }} onClose={() => {}} />,
    );
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });
});
