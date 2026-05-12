import { renderHook } from "@testing-library/react";
import { useCmdPalExecution } from "../hooks/useCmdPalExecution";

describe("useCmdPalExecution", () => {
  const mockActions = [
    {
      id: "1",
      label: "Test Action",
      execute: vi.fn(),
      category: "action" as const,
    },
    {
      id: "2",
      label: "With Feedback",
      execute: vi.fn(),
      category: "action" as const,
      showFeedback: true,
      successMessage: "Done!",
    },
  ];

  it("executes action by index", () => {
    const onToastShow = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useCmdPalExecution({ actions: mockActions, onToastShow, onClose }),
    );

    result.current.executeByIndex(0);

    expect(mockActions[0].execute).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onToastShow).not.toHaveBeenCalled();
  });

  it("shows toast when showFeedback is true", () => {
    const onToastShow = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useCmdPalExecution({ actions: mockActions, onToastShow, onClose }),
    );

    result.current.executeByIndex(1);

    expect(onToastShow).toHaveBeenCalledWith("Done!", {
      type: "success",
      duration: 2500,
    });
  });

  it("executes selected action", () => {
    const onToastShow = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useCmdPalExecution({ actions: mockActions, onToastShow, onClose }),
    );

    result.current.executeSelected(0);

    expect(mockActions[0].execute).toHaveBeenCalledTimes(1);
  });

  it("handles out-of-bounds index gracefully", () => {
    const onToastShow = vi.fn();
    const onClose = vi.fn();

    const { result } = renderHook(() =>
      useCmdPalExecution({ actions: mockActions, onToastShow, onClose }),
    );

    expect(() => result.current.executeByIndex(99)).not.toThrow();
    expect(() => result.current.executeSelected(-1)).not.toThrow();
  });
});
