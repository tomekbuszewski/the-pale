import type { Meta, StoryObj } from "@storybook/react";

import Separator from "./Separator";

export const Primary: StoryObj<typeof Separator> = {
  args: {},
};

export default {
  title: "Atoms/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;
