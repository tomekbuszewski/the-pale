import { render, screen } from "@testing-library/react";

import List from "./List";

describe("UI / Molecules / List", () => {
  it("renders the list with a title and items", () => {
    const title = "Test List";
    const items = ["Item 1", "Item 2", "Item 3"];
    render(<List title={title} items={items} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("applies the className prop correctly", () => {
    const className = "custom-class";
    render(<List title="Test List" items={["Item 1"]} className={className} />);

    const sectionElement = screen.getByRole("region");
    expect(sectionElement).toHaveClass(className);
  });

  it("handles an empty items list", () => {
    render(<List title="Test List" items={[]} />);

    const listElement = screen.queryByRole("list");
    expect(listElement).toBeInTheDocument();
    expect(listElement?.children.length).toBe(0);
  });

  it("renders the SectionHeader component with the correct title", () => {
    const title = "Test List";
    render(<List title={title} items={["Item 1"]} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
