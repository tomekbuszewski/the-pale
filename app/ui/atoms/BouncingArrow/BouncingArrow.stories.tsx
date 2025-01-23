import type { Meta, StoryObj } from "@storybook/react";

import BouncingArrow from "./BouncingArrow";

export const Primary: StoryObj<typeof BouncingArrow> = {};

export default {
  title: "Atoms/BouncingArrow",
  component: BouncingArrow,
  decorators: [
    (Story) => (
      <div style={{ padding: "10rem 0", margin: "auto" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BouncingArrow>;
