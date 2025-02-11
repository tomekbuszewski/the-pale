import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import type { ReactNode } from "react";

import ErrorPage from "./ErrorPage";

describe("UI / Organisms / ErrorPage", () => {
  const renderWithRouter = (component: ReactNode) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it("renders the 404 error text", () => {
    renderWithRouter(<ErrorPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the error messages", () => {
    renderWithRouter(<ErrorPage />);
    expect(
      screen.getByText("There's always a siren singing you to shipwreck."),
    ).toBeInTheDocument();
    expect(screen.getByText("Steer away from these rocks")).toBeInTheDocument();
  });

  it("renders both buttons with correct text and links", () => {
    renderWithRouter(<ErrorPage />);

    const homeButton = screen.getByText("A walking disaster");
    expect(homeButton).toBeInTheDocument();
    expect(homeButton.closest("a")).toHaveAttribute("href", "/");

    const radioheadButton = screen.getByText('"There there" ↗');
    expect(radioheadButton).toBeInTheDocument();
    expect(radioheadButton.closest("a")).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=7AQSLozK7aA",
    );
    expect(radioheadButton.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders children when provided", () => {
    const errorMessage = "Custom error message";
    renderWithRouter(<ErrorPage>{errorMessage}</ErrorPage>);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("does not render pre tag when no children are provided", () => {
    renderWithRouter(<ErrorPage />);
    expect(screen.queryByText("pre")).not.toBeInTheDocument();
  });
});
