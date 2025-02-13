import React from "react";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";

import BlogSection from "./BlogSection";

describe("BlogSection", () => {
  const mockItems: BlogPost[] = [
    {
      title: "First Post",
      date: new Date("2023-01-01"),
      tags: ["technology", "video"],
      youtube: "https://www.youtube.com/watch?v=first-post",
      link: {
        label: "Read",
        href: "https://example.com/first-post",
      },
      children: "This is the first post",
    },
    {
      title: "Second Post",
      date: new Date("2023-02-01"),
      tags: ["update", "newsletter"],
      youtube: "https://www.youtube.com/watch?v=second-post",
      link: {
        label: "Read",
        href: "https://example.com/second-post",
      },
      children: "This is the second post",
    },
  ];

  const mockPagination: PaginationProps = {
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    nextPage: 4,
    prevPage: 2,
    currentPage: 3,
  };

  it("renders the section title", () => {
    render(
      <MemoryRouter>
        <BlogSection items={mockItems} pagination={mockPagination} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Videos & Writings")).toBeInTheDocument();
  });

  it("renders all provided items", () => {
    render(
      <MemoryRouter>
        <BlogSection items={mockItems} pagination={mockPagination} />
      </MemoryRouter>,
    );
    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      if (item.children) {
        expect(screen.getByText(item.children as string)).toBeInTheDocument();
      }
    });
  });

  it("renders pagination component", () => {
    render(
      <MemoryRouter>
        <BlogSection items={mockItems} pagination={mockPagination} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
