import type { Meta, StoryObj } from "@storybook/react";

import ErrorPage from "./ErrorPage";

export const Primary: StoryObj<typeof ErrorPage> = {
  args: {},
};

export default {
  title: "Organisms/ErrorPage",
  component: ErrorPage,
} satisfies Meta<typeof ErrorPage>;
