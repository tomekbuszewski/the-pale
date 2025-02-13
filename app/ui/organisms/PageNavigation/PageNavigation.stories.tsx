import type { Meta, StoryObj } from "@storybook/react";

import PageNavigation from "./PageNavigation";

export const Primary: StoryObj<typeof PageNavigation> = {
  args: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export default {
  title: "Organisms/PageNavigation",
  component: PageNavigation,
} satisfies Meta<typeof PageNavigation>;
