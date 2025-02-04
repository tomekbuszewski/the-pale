import type { Meta, StoryObj } from "@storybook/react";

import SmallCard from "./SmallCard";

export const Primary: StoryObj<typeof SmallCard> = {
  args: {
    title: "Discovery & Strategy",
    body: "Every project is unique, just like your business.",
    no: 1,
  },
};

export default {
  title: "Molecules/SmallCard",
  component: SmallCard,
} satisfies Meta<typeof SmallCard>;
