import type { Meta, StoryObj } from "@storybook/react";

import BlogSection from "./BlogSection";

export const Primary: StoryObj<typeof BlogSection> = {
  args: {
    pagination: {
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      nextPage: 4,
      prevPage: 2,
      currentPage: 3,
    },
    items: [
      {
        title: "Hello from Storybook",
        date: new Date(),
        tags: ["design", "code", "consultant", "website"],
        children: <p>Hello from Storybook</p>,
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        link: "https://www.google.com",
      },
      {
        title: "Hello from Storybook",
        date: new Date(),
        tags: ["design", "code", "consultant", "website"],
        children: <p>Hello from Storybook</p>,
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        link: "https://www.google.com",
      },
      {
        title: "Hello from Storybook",
        date: new Date(),
        tags: ["design", "code", "consultant", "website"],
        children: <p>Hello from Storybook</p>,
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        link: "https://www.google.com",
      },
    ],
  },
};

export default {
  title: "Organisms/BlogSection",
  component: BlogSection,
} satisfies Meta<typeof BlogSection>;
