import type { Meta, StoryObj } from "@storybook/react";

import BlogPost from "./BlogPost";

export const Primary: StoryObj<typeof BlogPost> = {
  args: {
    title: "Hello from Storybook",
    meta: {
      date: new Date("2023-01-01"),
      tags: ["tag1", "tag2"],
    },
    body: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>",
  },
};

export default {
  title: "Organisms/BlogPost",
  component: BlogPost,
} satisfies Meta<typeof BlogPost>;
