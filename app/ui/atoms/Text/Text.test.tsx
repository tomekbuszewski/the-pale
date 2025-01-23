import { render } from "@testing-library/react";

import Text from "./Text";

import styles from "./Text.module.scss";

describe("UI / Atoms / Text", () => {
  it("renders a <h1> tag for 'hero' variant", () => {
    const { container } = render(<Text variant="hero">Hero Text</Text>);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("renders a <p> tag for 'regular' variant", () => {
    const { container } = render(<Text variant="regular">Regular Text</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders a <span> tag for 'small' variant", () => {
    const { container } = render(<Text variant="small">Small Text</Text>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders a <span> tag for 'highlight' variant", () => {
    const { container } = render(
      <Text variant="highlight">Highlight Text</Text>,
    );
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders a <h2> tag for 'section-heading' variant", () => {
    const { container } = render(
      <Text variant="section-heading">Section Heading</Text>,
    );
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("renders a <h3> tag for 'title' variant", () => {
    const { container } = render(<Text variant="title">Title Text</Text>);
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("renders a <span> tag for 'button' variant", () => {
    const { container } = render(<Text variant="button">Button Text</Text>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders a <li> tag for 'list' variant", () => {
    const { container } = render(<Text variant="list">List Item</Text>);
    expect(container.querySelector("li")).toBeInTheDocument();
  });

  it("renders a <p> tag for 'about' variant", () => {
    const { container } = render(<Text variant="about">About Text</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders a <h3> tag for 'work' variant", () => {
    const { container } = render(<Text variant="work">Work Text</Text>);
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("renders a <p> tag by default", () => {
    const { container } = render(<Text>Default Text</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("applies bold class when bold prop is true", () => {
    const { container } = render(<Text bold>Bold Text</Text>);
    expect(container.firstChild).toHaveClass(styles.bold);
  });

  it("applies mono class when mono prop is true", () => {
    const { container } = render(<Text mono>Mono Text</Text>);
    expect(container.firstChild).toHaveClass(styles.mono);
  });

  it("applies the correct class for text alignment", () => {
    const { container: leftAlign } = render(
      <Text align="left">Left Align</Text>,
    );
    expect(leftAlign.firstChild).toHaveClass("align-left");

    const { container: centerAlign } = render(
      <Text align="center">Center Align</Text>,
    );
    expect(centerAlign.firstChild).toHaveClass("align-center");

    const { container: rightAlign } = render(
      <Text align="right">Right Align</Text>,
    );
    expect(rightAlign.firstChild).toHaveClass("align-right");
  });

  it("applies the correct class for text color", () => {
    const colors = [
      "background",
      "lead",
      "accent",
      "text",
      "text-light",
      "lead-light",
      "minor",
    ];

    colors.forEach((color) => {
      const { container } = render(
        <Text color={color as unknown as undefined}>Colored Text</Text>,
      );
      expect(container.firstChild).toHaveClass(`text-${color}`);
    });
  });
});
