import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { render as baseRender, screen } from "@testing-library/react";

import CaseIllustration from "./CaseIllustration";

import styles from "./CaseIllustration.module.scss";

const render = (ui: ReactElement) =>
  baseRender(ui, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

describe("Molecules / CaseIllustration", () => {
  const defaultProps = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    description: ["Description line 1", "Description line 2"],
    background: "#f5f5f5",
  };

  it("renders the component with all required props", () => {
    render(<CaseIllustration {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Description line 1")).toBeInTheDocument();
    expect(screen.getByText("Description line 2")).toBeInTheDocument();
  });

  it("applies color background correctly", () => {
    const { container } = render(<CaseIllustration {...defaultProps} />);

    const sectionWrapper = container.querySelector("." + styles.mainContent);
    expect(sectionWrapper).toHaveStyle("background-color: #f5f5f5");
  });

  it("applies image background correctly", () => {
    const props = {
      ...defaultProps,
      background: "https://example.com/image.jpg",
    };

    const { container } = render(<CaseIllustration {...props} />);

    const sectionWrapper = container.querySelector("." + styles.mainContent);
    expect(sectionWrapper).toHaveStyle(
      `background-image: url("https://example.com/image.jpg")`,
    );
  });

  it("renders HTML content in description correctly", () => {
    const props = {
      ...defaultProps,
      description: ["Text with <strong>bold</strong> content"],
    };

    render(<CaseIllustration {...props} />);

    const strongElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "strong" && content === "bold";
    });

    expect(strongElement).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <CaseIllustration {...defaultProps} className="custom-class" />,
    );

    const wrapper = container.querySelector("section");
    expect(wrapper).toHaveClass("custom-class");
  });
});
