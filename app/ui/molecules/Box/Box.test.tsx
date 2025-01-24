import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import CalendarIcon from "./assets/calendar.svg?react";
import Box from "./Box";

import styles from "./Box.module.scss";

describe("UI / Molecules / Box", () => {
  it("renders with a title and tags", () => {
    render(
      <MemoryRouter>
        <Box
          title="Test Title"
          tags={["tag1", "tag2"]}
          youtube=""
          link=""
          date={new Date()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("renders with an icon and onClick handler", () => {
    render(
      <MemoryRouter>
        <Box title="Service" icon={<span>Icon</span>} onClick={vi.fn()} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("applies hidden class when hidden prop is true", () => {
    render(
      <MemoryRouter>
        <Box
          title="Hidden Box"
          hidden
          icon={<CalendarIcon />}
          onClick={vi.fn()}
        >
          Hello
        </Box>
      </MemoryRouter>,
    );
    const article = screen.getByRole("article");
    expect(article).toHaveClass(styles.hidden);
  });
});
