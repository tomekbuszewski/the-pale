import { render, screen } from "@testing-library/react";

import CaseImages from "./CaseImages";

import styles from "./CaseImages.module.scss";

// Small base64 encoded 1x1 pixel transparent PNG
const base64Image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const base64Image2 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C9AAAAASUVORK5CYII=";

describe("CaseImages", () => {
  const defaultProps = {
    mode: "desktop" as const,
    title: "Test Gallery",
    description: ["Description line 1", "Description line 2"],
    images: [base64Image, base64Image2, base64Image, base64Image2],
  };

  it("renders the component with required props", () => {
    render(<CaseImages {...defaultProps} />);

    expect(screen.getByText("Test Gallery")).toBeInTheDocument();
    expect(screen.getByText("Description line 1")).toBeInTheDocument();
    expect(screen.getByText("Description line 2")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(4);
  });

  it("distributes images correctly in desktop mode with first image in odd columns", () => {
    const { container } = render(<CaseImages {...defaultProps} />);

    const columns = container.querySelectorAll("." + styles.column);
    expect(columns.length).toBe(1);
    expect(columns[0].querySelectorAll("img").length).toBe(4);
  });

  it("distributes images correctly in tablet mode with first image in odd columns", () => {
    const props = {
      ...defaultProps,
      mode: "tablet" as const,
      images: [
        base64Image,
        base64Image2,
        base64Image,
        base64Image2,
        base64Image,
        base64Image2,
      ],
    };

    const { container } = render(<CaseImages {...props} />);

    const columns = container.querySelectorAll("." + styles.column);
    expect(columns.length).toBe(2);

    expect(columns[0].querySelectorAll("img").length).toBe(3);
    expect(columns[1].querySelectorAll("img").length).toBe(4);

    // First and last images in column 1 should be the same
    const column1Images = columns[1].querySelectorAll("img");
    const firstImageInColumn1 = column1Images[0].getAttribute("src");
    const lastImageInColumn1 =
      column1Images[column1Images.length - 1].getAttribute("src");
    expect(firstImageInColumn1).toBe(lastImageInColumn1);
  });

  it("handles empty images array", () => {
    const props = {
      ...defaultProps,
      images: [],
    };

    render(<CaseImages {...props} />);

    // Should not have any images
    expect(screen.queryAllByRole("img").length).toBe(0);
  });

  it("renders HTML content in description correctly", () => {
    const props = {
      ...defaultProps,
      description: ["Text with <strong>bold</strong> content"],
    };

    render(<CaseImages {...props} />);

    const strongElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "strong" && content === "bold";
    });

    expect(strongElement).toBeInTheDocument();
  });

  it("distributes images correctly in mobile mode with first image in odd columns", () => {
    const props = {
      ...defaultProps,
      mode: "mobile" as const,
      images: Array(8).fill(base64Image),
    };

    const { container } = render(<CaseImages {...props} />);

    const columns = container.querySelectorAll("." + styles.column);
    expect(columns.length).toBe(3);
    expect(columns[0].querySelectorAll("img").length).toBe(3);
    expect(columns[1].querySelectorAll("img").length).toBe(4);
    expect(columns[2].querySelectorAll("img").length).toBe(2);
  });
});
