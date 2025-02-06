import type { Meta, StoryObj } from "@storybook/react";

import ContactButton from "./ContactButton";

export const Primary: StoryObj<typeof ContactButton> = {
  args: {},
};

export default {
  title: "Atoms/ContactButton",
  component: ContactButton,
} satisfies Meta<typeof ContactButton>;
