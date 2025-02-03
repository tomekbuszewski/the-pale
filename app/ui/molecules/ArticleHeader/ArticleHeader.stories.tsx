import type { Meta, StoryObj } from "@storybook/react";

import ArticleHeader from "./ArticleHeader";

export const Primary: StoryObj<typeof ArticleHeader> = {
  args: {
    title: "Hello from Storybook",
    meta: {
      date: new Date(),
      tags: ["storybook", "react", "typescript"],
    },
  },
};

export default {
  title: "Molecules/ArticleHeader",
  component: ArticleHeader,
} satisfies Meta<typeof ArticleHeader>;
