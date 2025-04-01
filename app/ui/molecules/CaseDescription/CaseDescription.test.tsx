import { render, screen } from "@testing-library/react";

import CaseDescription from "./CaseDescription";

describe("CaseDescription", () => {
  const defaultProps = {
    title: "Test Title",
    description: ["Description line 1", "Description line 2"],
  };

  it("renders the component with required props", () => {
    render(<CaseDescription {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Description line 1")).toBeInTheDocument();
    expect(screen.getByText("Description line 2")).toBeInTheDocument();
  });

  it("renders HTML content in description correctly", () => {
    const props = {
      ...defaultProps,
      description: ["Text with <strong>bold</strong> content"],
    };

    render(<CaseDescription {...props} />);

    const strongElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "strong" && content === "bold";
    });

    expect(strongElement).toBeInTheDocument();
  });

  it("renders with card when provided", () => {
    const props = {
      ...defaultProps,
      card: {
        title: "Card Title",
        description: ["Card item 1", "Card item 2"],
      },
    };

    render(<CaseDescription {...props} />);

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card item 1")).toBeInTheDocument();
    expect(screen.getByText("Card item 2")).toBeInTheDocument();
  });

  it("does not render card when not provided", () => {
    render(<CaseDescription {...defaultProps} />);

    // Assuming List component renders its title in a heading element
    const cardElements = screen.queryAllByRole("heading");
    // We should only have the main title heading
    expect(cardElements.length).toBe(1);
    expect(cardElements[0]).toHaveTextContent("Test Title");
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <CaseDescription {...defaultProps} className="custom-class" />,
    );

    // SectionWrapper should have the custom class
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });
});
