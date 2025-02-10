import { MemoryRouter } from "react-router";
import { render as baseRender, screen } from "@testing-library/react";

import type { ReactElement } from "react";

import ContactCta from "./ContactCta";

const render = (ui: ReactElement) =>
  baseRender(<MemoryRouter>{ui}</MemoryRouter>);

describe("UI / Molecules / ContactCta", () => {
  const mockButtons = [
    { label: "Get Started", href: "/start", variant: "primary" },
    { label: "Learn More", href: "/learn", variant: "secondary" },
  ];
  const mockText = "Ready to create your website?";

  it("renders the component with the correct text", () => {
    render(<ContactCta buttons={mockButtons} text={mockText} />);
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("renders all buttons with correct labels and hrefs", () => {
    render(<ContactCta buttons={mockButtons} text={mockText} />);
    mockButtons.forEach((button) => {
      const buttonElement = screen.getByText(button.label);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement.closest("a")).toHaveAttribute("href", button.href);
    });
  });

  it("applies the correct className to the root element", () => {
    const customClassName = "custom-class";
    const { container } = render(
      <ContactCta
        buttons={mockButtons}
        text={mockText}
        className={customClassName}
      />,
    );
    expect(container.firstChild).toHaveClass(customClassName);
  });

  it("renders buttons with the correct variants", () => {
    render(<ContactCta buttons={mockButtons} text={mockText} />);
    mockButtons.forEach((button) => {
      const buttonElement = screen.getByText(button.label);
      expect(buttonElement.className).toMatch(
        new RegExp(`_${button.variant}_[a-zA-Z0-9]+`),
      );
    });
  });
});
