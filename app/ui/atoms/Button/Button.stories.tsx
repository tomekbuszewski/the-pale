import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "Hello from Storybook",
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: "Hello from Storybook",
    variant: "secondary",
  },
};

export const Tertiary: StoryObj<typeof Button> = {
  args: {
    children: "Hello from Storybook",
    variant: "tertiary",
  },
};

export default {
  title: "Atoms/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;
