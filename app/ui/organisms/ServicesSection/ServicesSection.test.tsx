import { render, screen } from "@testing-library/react";
import ServicesSection from "./ServicesSection";

describe("UI / Organisms / ServicesSection", () => {
  it("renders properly", () => {
    render(<ServicesSection id="test-id" name="test-name" />);
    const servicesSectionElement = screen.getByTestId("test-id");

    expect(servicesSectionElement).toBeInTheDocument();
  });
});
