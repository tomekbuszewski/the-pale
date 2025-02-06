import { MemoryRouter } from "react-router";
import { Contact } from "@nav";
import { render, screen } from "@testing-library/react";

import ContactButton from "./ContactButton";

describe("UI / Atoms / ContactButton", () => {
  it("renders with correct text and image", () => {
    render(
      <MemoryRouter>
        <ContactButton />
      </MemoryRouter>,
    );

    // Check if text is present
    expect(screen.getByText("Contact me")).toBeInTheDocument();

    // Check if image exists with correct alt text
    const image = screen.getByAltText("Book a call!");
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe("IMG");
  });

  it("renders as a link with correct navigation path", () => {
    render(
      <MemoryRouter>
        <ContactButton />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/" + Contact.href);
  });
});
