import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import LargeCard from "./LargeCard";

describe("UI / Molecules / LargeCard", () => {
  const title = "Test Title";
  const description = <p>Test Description</p>;
  const body = <div>Test Body</div>;

  it("renders the title and description correctly", () => {
    render(<LargeCard title={title} description={description} body={body} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders the more button when more prop is provided", () => {
    const more = { href: "/test", label: "Learn More" };
    render(
      <MemoryRouter>
        <LargeCard
          title={title}
          description={description}
          more={more}
          body={body}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(more.label)).toBeInTheDocument();
  });

  it("renders the body content correctly", () => {
    render(<LargeCard title={title} description={description} body={body} />);
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });

  it("does not render the more button when more prop is not provided", () => {
    render(<LargeCard title={title} description={description} body={body} />);
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
  });
});
