import type { Meta, StoryObj } from "@storybook/react";

import Logo from "./Logo";

export const Primary: StoryObj<typeof Logo> = {
  args: {},
};

export const WithFill = () => {
  return <Logo fill="red" />;
};

export const WithSize = () => {
  return <Logo style={{ width: "200px" }} />;
};

export default {
  title: "Atoms/Logo",
  component: Logo,
} satisfies Meta<typeof Logo>;
