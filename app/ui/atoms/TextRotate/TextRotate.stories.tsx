import type { Meta, StoryObj } from "@storybook/react";

import TextRotate from "./TextRotate";

export const Primary: StoryObj<typeof TextRotate> = {
  args: {
    texts: ["Hello", "From", "Storybook"],
  },
};

export default {
  title: "Atoms/TextRotate",
  component: TextRotate,
} satisfies Meta<typeof TextRotate>;
