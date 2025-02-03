import { render, screen } from "@testing-library/react";
import ArticleHeader from "./ArticleHeader";

describe("UI / Molecules / ArticleHeader", () => {
  it("renders properly", () => {
    render(<ArticleHeader id="test-id" name="test-name" />);
    const articleHeaderElement = screen.getByTestId("test-id");

    expect(articleHeaderElement).toBeInTheDocument();
  });
});
