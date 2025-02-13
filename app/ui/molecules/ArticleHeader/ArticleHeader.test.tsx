import { MemoryRouter } from "react-router";
import { fireEvent, render } from "@testing-library/react";

import type { ReactElement } from "react";

import ArticleHeader from "./ArticleHeader";

describe("UI / Molecules / ArticleHeader", () => {
  const mockTitle = "Test Title";
  const mockMeta = {
    date: new Date("2024-01-01"),
    tags: ["react", "testing"],
  };

  const renderWithRouter = (ui: ReactElement) => {
    return render(ui, { wrapper: MemoryRouter });
  };

  test("renders title without meta", () => {
    const { getByText } = renderWithRouter(<ArticleHeader title={mockTitle} />);
    expect(getByText(mockTitle)).toBeInTheDocument();
  });

  test("renders meta section when meta prop provided", () => {
    const { getByText } = renderWithRouter(
      <ArticleHeader title={mockTitle} meta={mockMeta} />,
    );
    expect(getByText("1 January 2024")).toBeInTheDocument();
    expect(getByText("react · testing")).toBeInTheDocument();
  });

  test("back button triggers window.history.back", () => {
    const historySpy = vi.spyOn(window.history, "back");
    const { getByText } = renderWithRouter(<ArticleHeader title={mockTitle} />);

    fireEvent.click(getByText("Go back"));
    expect(historySpy).toHaveBeenCalled();

    historySpy.mockRestore();
  });

  test("renders HTML in title safely", () => {
    const titleWithHTML = "Test <em>Title</em>";
    const { container } = renderWithRouter(
      <ArticleHeader title={titleWithHTML} />,
    );
    expect(container.querySelector("em")).toBeInTheDocument();
  });

  test("renders empty tags list gracefully", () => {
    const emptyMeta = { ...mockMeta, tags: [] };
    const { container } = renderWithRouter(
      <ArticleHeader title={mockTitle} meta={emptyMeta} />,
    );
    expect(container.querySelector(".meta")).not.toBeInTheDocument();
  });
});
