import type { Meta, StoryObj } from "@storybook/react";

import PageHeader from "./PageHeader";

const links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const Primary: StoryObj<typeof PageHeader> = {
  args: {
    links,
  },
};

export const Collapsed = () => (
  <div style={{ height: "1000dvh" }}>
    <PageHeader links={links} />
  </div>
);

export default {
  title: "Organisms/PageHeader",
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;
