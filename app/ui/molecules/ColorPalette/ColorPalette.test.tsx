import { render, screen } from "@testing-library/react";
import ColorPalette from "./ColorPalette";

describe("UI / Molecules / ColorPalette", () => {
  it("renders properly", () => {
    render(<ColorPalette id="test-id" name="test-name" />);
    const colorPaletteElement = screen.getByTestId("test-id");

    expect(colorPaletteElement).toBeInTheDocument();
  });
});
