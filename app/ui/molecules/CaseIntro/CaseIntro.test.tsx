import { MemoryRouter } from "react-router";
import { Content } from "@features";
import { render as baseRender, screen } from "@testing-library/react";

const render = (ui: ReactElement) =>
  baseRender(
    <MemoryRouter>
      <Content.context.Provider value="en">{ui}</Content.context.Provider>
    </MemoryRouter>,
  );

import type { ReactElement } from "react";

import CaseIntro from "./CaseIntro";

describe("CaseIntro", () => {
  const defaultProps = {
    title: "Test Case Study",
    lead: "This is a <strong>lead</strong> paragraph for the case study.",
    description: [
      "First paragraph of the description with <em>emphasis</em>.",
      "Second paragraph with some <code>code</code> examples.",
      "Third paragraph explaining the project details.",
    ],
  };

  it("renders the component with required props", () => {
    render(<CaseIntro {...defaultProps} />);

    // Check if title is rendered
    expect(screen.getByText("Test Case Study")).toBeInTheDocument();

    // Check if lead paragraph is rendered with HTML
    const strongElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "strong" && content === "lead";
    });
    expect(strongElement).toBeInTheDocument();

    // Check if description paragraphs are rendered
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "em" && content === "emphasis"
        );
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === "code" && content === "code";
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Third paragraph explaining the project details."),
    ).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <CaseIntro {...defaultProps} className="custom-class" />,
    );

    // Check if the custom class is applied to the wrapper
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders HTML content in lead correctly", () => {
    render(
      <CaseIntro
        {...defaultProps}
        lead="Text with <strong>bold</strong> content"
      />,
    );

    const strongElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "strong" && content === "bold";
    });

    expect(strongElement).toBeInTheDocument();
  });

  it("renders HTML content in description correctly", () => {
    render(
      <CaseIntro
        {...defaultProps}
        description={["Text with <a href='#'>link</a> content"]}
      />,
    );

    const linkElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "a" && content === "link";
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("#");
  });
});
