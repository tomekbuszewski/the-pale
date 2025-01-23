import { render, screen } from "@testing-library/react";

import SectionWrapper from "./SectionWrapper";

import styles from "./SectionWrapper.module.scss";

describe("UI / Atoms / SectionWrapper", () => {
  it("renders children correctly", () => {
    render(
      <SectionWrapper>
        <div>Test Content</div>
      </SectionWrapper>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <SectionWrapper title="Test Title">
        <div>Content</div>
      </SectionWrapper>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("uses custom tag when provided", () => {
    render(
      <SectionWrapper tag="article">
        <div>Content</div>
      </SectionWrapper>,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("applies breakout styles correctly", () => {
    const { container } = render(
      <SectionWrapper breakout="left">
        <div>Content</div>
      </SectionWrapper>,
    );

    const contentDiv = container.querySelector(`.${styles.content}`);
    expect(contentDiv).toHaveClass(styles.breakout);
    expect(contentDiv).toHaveClass(styles.left);
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(
      <SectionWrapper className="custom-class">
        <div>Content</div>
      </SectionWrapper>,
    );

    expect(container.firstChild).toHaveClass(styles.wrapper, "custom-class");
  });

  it("applies custom contentClassName to content wrapper", () => {
    const { container } = render(
      <SectionWrapper contentClassName="custom-content-class">
        <div>Content</div>
      </SectionWrapper>,
    );

    const contentDiv = container.querySelector(`.${styles.content}`);
    expect(contentDiv).toHaveClass(styles.content, "custom-content-class");
  });
});
