import { render, screen } from "@testing-library/react";
import Carousel from "./Carousel";

describe("UI / Molecules / Carousel", () => {
  it("renders properly", () => {
    render(<Carousel id="test-id" name="test-name" />);
    const carouselElement = screen.getByTestId("test-id");

    expect(carouselElement).toBeInTheDocument();
  });
});
