import type { Meta, StoryObj } from "@storybook/react";

import SectionHeader from "./SectionHeader";

export const Primary: StoryObj<typeof SectionHeader> = {
  args: {
    title: "Hello from Storybook",
  },
};

export default {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
} satisfies Meta<typeof SectionHeader>;
