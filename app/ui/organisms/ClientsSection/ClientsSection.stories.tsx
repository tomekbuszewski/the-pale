import type { Meta, StoryObj } from "@storybook/react";

import ClientsSection from "./ClientsSection";

export const Primary: StoryObj<typeof ClientsSection> = {
  args: {
    children: "Hello from Storybook",
  },
};

export default {
  title: "Organisms/ClientsSection",
  component: ClientsSection,
} satisfies Meta<typeof ClientsSection>;
