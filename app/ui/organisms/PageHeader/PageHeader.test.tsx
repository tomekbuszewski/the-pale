import { MemoryRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";

import PageHeader from "./PageHeader";

const renderPageHeader = () => {
  return render(
    <MemoryRouter>
      <PageHeader />
    </MemoryRouter>,
  );
};

describe("UI / Organisms / PageHeader", () => {
  it("renders the header with logo", () => {
    renderPageHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders menu toggle button", () => {
    renderPageHeader();
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("handles menu toggle interactions", () => {
    renderPageHeader();
    const menuButton = screen.getByRole("button");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-header";
    render(
      <MemoryRouter>
        <PageHeader className={customClass} />
      </MemoryRouter>,
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(customClass);
  });
});
