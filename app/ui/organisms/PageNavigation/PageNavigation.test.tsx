import { render, screen } from "@testing-library/react";
import PageNavigation from "./PageNavigation";

describe("UI / Organisms / PageNavigation", () => {
  it("renders properly", () => {
    render(<PageNavigation id="test-id" name="test-name" />);
    const pageNavigationElement = screen.getByTestId("test-id");

    expect(pageNavigationElement).toBeInTheDocument();
  });
});
