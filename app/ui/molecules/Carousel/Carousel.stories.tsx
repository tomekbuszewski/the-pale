import type { Meta, StoryObj } from "@storybook/react";

import Image from "./assets/icon.png";
import Carousel from "./Carousel";

export const Primary: StoryObj<typeof Carousel> = {
  args: {
    columns: 2,
    icons: [
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
      [Image, "whatever"],
    ],
  },
};

export default {
  title: "Molecules/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;
