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
} satisfies Meta<typeof HeroSection>;
