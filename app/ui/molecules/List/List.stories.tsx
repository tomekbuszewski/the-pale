import type { Meta, StoryObj } from "@storybook/react";

import List from "./List";

const meta = {
  title: "Molecules/List",
  component: List,
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof List>;

// Story with a small number of items
export const SmallList: Story = {
  args: {
    title: "Small List",
    items: ["Item 1", "Item 2", "Item 3"],
  },
};

// Story with a large number of items
export const LargeList: Story = {
  args: {
    title: "Large List",
    items: Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`),
  },
};
