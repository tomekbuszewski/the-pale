import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@ui/atoms";

import CalendarIcon from "./assets/calendar.svg?react";
import Box from "./Box";

export const Blogpost: StoryObj<typeof Box> = {
  args: {
    title: "Hello from Storybook",
    date: new Date(),
    tags: ["design", "code", "consultant", "website"],
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    link: {
      href: "/blog/hello-from-storybook",
      label: "Read more",
    },
    children: (
      <>
        <Text>
          If you’ve been following the React world for a year or so, you
          might’ve heard about server components concept.
        </Text>
      </>
    ),
  },
};

export const Service: StoryObj<typeof Box> = {
  args: {
    title: "Website<br />Design",
    onClick: () => null,
    icon: <CalendarIcon />,
    children: (
      <>
        <Text>Full-Cycle Web Solutions: Design, Development, Delivery.</Text>
        <Text>
          I provide a seamless experience from initial design concepts to the
          final product. Whether you’re launching a new business or revamping an
          existing site, I ensure everything works perfectly.
        </Text>
      </>
    ),
  },
};

export default {
  title: "Molecules/Box",
  component: Box,
} satisfies Meta<typeof Box>;
