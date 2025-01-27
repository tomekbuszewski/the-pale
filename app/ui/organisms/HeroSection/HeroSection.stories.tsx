import type { Meta, StoryObj } from "@storybook/react";

import HeroSection from "./HeroSection";

export const Primary: StoryObj<typeof HeroSection> = {
  args: {
    copy: "Hello from Storybook",
    keywords: ["design", "code", "consultant", "website"],
  },
};

export default {
  title: "Organisms/HeroSection",
  component: HeroSection,
  decorators: [(Story) => <div style={{ height: "300dvh" }}>{Story()}</div>],
} satisfies Meta<typeof HeroSection>;
