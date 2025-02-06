import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import Logo from "./Logo";

describe("UI / Atoms / Logo", () => {
  const renderLogo = (props = {}) => {
    return render(
      <MemoryRouter>
        <Logo {...props} />
      </MemoryRouter>,
    );
  };

  it("renders the logo with default title", () => {
    const { container } = renderLogo();
    expect(container.querySelector("figcaption")).toHaveTextContent(
      "Buszewski.com",
    );
  });

  it("renders with custom title", () => {
    renderLogo({ title: "Custom Title" });
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("applies wrapper className correctly", () => {
    const { container } = renderLogo({ wrapperClassName: "custom-wrapper" });
    expect(container.querySelector(".custom-wrapper")).toBeInTheDocument();
  });

  it("passes SVG props to the Image component", () => {
    const { container } = renderLogo({ fill: "red" });
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "red");
  });

  it("renders logo as a link to homepage", () => {
    renderLogo();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
