import type { Meta, StoryObj } from "@storybook/react";

import MockImageDesk from "./assets/gameshelf-main.jpg";
import MockImage from "./assets/gameshelf-mobile.jpg";
import WorkItem from "./WorkItem";

export const Primary: StoryObj<typeof WorkItem> = {
  args: {
    title: "GameShelf",
    description: [
      "Gameshelf aims to deliver latest new, world-class columns, interviews and insides for all the gamers around the world.",
    ],
    tags: ["Design", "Development"],
    mobileImage: MockImage,
    desktopImage: MockImageDesk,
    index: 0,
  },
};

export const ToLeft: StoryObj<typeof WorkItem> = {
  args: {
    title: "GameShelf",
    description: [
      "Gameshelf aims to deliver latest new, world-class columns, interviews and insides for all the gamers around the world.",
    ],
    align: "left",
    tags: ["Design", "Development"],
    mobileImage: MockImage,
    desktopImage: MockImageDesk,
    index: 0,
  },
};

export default {
  title: "Molecules/WorkItem",
  component: WorkItem,
} satisfies Meta<typeof WorkItem>;
