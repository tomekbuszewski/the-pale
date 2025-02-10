import type { Meta, StoryObj } from "@storybook/react";

import ServicePage from "./ServicePage";

export const Primary: StoryObj<typeof ServicePage> = {
  args: {
    children: "Hello from Storybook",
  },
};

export default {
  title: "Organisms/ServicePage",
  component: ServicePage,
} satisfies Meta<typeof ServicePage>;
