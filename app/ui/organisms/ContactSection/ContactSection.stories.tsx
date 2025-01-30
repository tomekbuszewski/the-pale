import type { Meta, StoryObj } from "@storybook/react";

import ContactSection from "./ContactSection";

export const Primary: StoryObj<typeof ContactSection> = {
  args: {
    email: "mailto:example@email.com",
    calendar: "https://cal.com/example/30min",
    location: "Warsaw, Poland",
  },
};

export default {
  title: "Organisms/ContactSection",
  component: ContactSection,
} satisfies Meta<typeof ContactSection>;
