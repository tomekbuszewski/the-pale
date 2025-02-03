import type { Meta, StoryObj } from "@storybook/react";

import BlogPost from "./BlogPost";

export const Primary: StoryObj<typeof BlogPost> = {
  args: {
    children: "Hello from Storybook",
  },
};

export default {
  title: "Organisms/BlogPost",
  component: BlogPost,
} satisfies Meta<typeof BlogPost>;
