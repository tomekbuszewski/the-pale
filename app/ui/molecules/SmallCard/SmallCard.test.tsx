import { render, screen } from "@testing-library/react";

import SmallCard from "./SmallCard";

describe("UI / Molecules / SmallCard", () => {
  const props = {
    title: "Test Title",
    body: "Test Body",
    no: "1",
  };

  it("renders the title correctly", () => {
    render(<SmallCard {...props} />);
    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the body correctly", () => {
    render(<SmallCard {...props} />);
    const bodyElement = screen.getByText(props.body);
    expect(bodyElement).toBeInTheDocument();
  });

  it("renders the number correctly", () => {
    render(<SmallCard {...props} />);
    const numberElement = screen.getByText(props.no);
    expect(numberElement).toBeInTheDocument();
  });

  it("applies additional HTML props correctly", () => {
    const className = "custom-class";
    render(<SmallCard {...props} className={className} />);
    const cardElement = screen.getByRole("article");
    expect(cardElement).toHaveClass(className);
  });
});
