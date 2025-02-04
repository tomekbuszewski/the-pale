import type { Meta, StoryObj } from "@storybook/react";

import SectionHeader from "./SectionHeader";

export const Primary: StoryObj<typeof SectionHeader> = {
  args: {
    title: "Hello from Storybook",
  },
};

export const Secondary = () => (
  <div style={{ background: "#000", padding: 60 }}>
    <SectionHeader dark title="Hello from Storybook" />
  </div>
);

export default {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
} satisfies Meta<typeof SectionHeader>;
