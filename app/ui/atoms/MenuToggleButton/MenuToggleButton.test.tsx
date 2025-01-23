import { fireEvent, render, screen } from "@testing-library/react";

import MenuToggleButton from "./MenuToggleButton";

describe("UI / Atoms / MenuToggleButton", () => {
  it("renders with default closed state", () => {
    render(<MenuToggleButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-label", "Open menu");
    expect(screen.getByText("Open menu")).toBeInTheDocument();
  });

  it("renders with open state", () => {
    render(<MenuToggleButton isOpen={true} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-label", "Close menu");
    expect(screen.getByText("Close menu")).toBeInTheDocument();
  });

  it("calls onOpen when clicked in closed state", () => {
    const onOpen = vi.fn();
    render(<MenuToggleButton onOpen={onOpen} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicked in open state", () => {
    const onClose = vi.fn();
    render(<MenuToggleButton isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<MenuToggleButton className={customClass} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("applies open class when isOpen is true", () => {
    render(<MenuToggleButton isOpen={true} />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("open");
  });

  it("should be hidden on screens larger than 1200px", () => {
    // Set viewport width to 1201px
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        return {
          matches: query.includes("min-width: 1200px"),
        };
      }),
    });

    render(<MenuToggleButton />);
    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});
