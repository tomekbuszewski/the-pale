import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import ServicePage from "./ServicePage";

describe("UI / Organisms / ServicePage", () => {
  const mockProps = {
    title: "Test Service",
    intro: "<p>Test intro</p>",
    body: "<p>Test body</p>",
  };

  const mockProcessItems = [
    { title: "Step 1", body: "First step" },
    { title: "Step 2", body: "Second step" },
  ];

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders basic content correctly", () => {
    renderWithRouter(<ServicePage {...mockProps} />);

    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Test intro")),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Test body")),
    ).toBeInTheDocument();
  });

  it("renders process section when process props are provided", () => {
    renderWithRouter(
      <ServicePage
        {...mockProps}
        process="Process Title"
        processItems={mockProcessItems}
      />,
    );

    expect(screen.getByText("Process Title")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("does not render process section when process props are missing", () => {
    renderWithRouter(<ServicePage {...mockProps} />);

    expect(screen.queryByText("Step 1")).not.toBeInTheDocument();
  });

  it("renders custom CTA when provided", () => {
    const customCTA = {
      text: "Custom CTA",
      buttons: [
        {
          variant: "primary",
          label: "Custom Button",
          href: "#custom",
        },
      ],
    };

    renderWithRouter(<ServicePage {...mockProps} cta={customCTA} />);

    expect(screen.getByText("Custom CTA")).toBeInTheDocument();
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
});
