import { TextRotate } from "@ui/atoms";

import type { Meta, StoryObj } from "@storybook/react";

import HeroSection from "./HeroSection";

export const Primary: StoryObj<typeof HeroSection> = {
  args: {
    copy: "Hello from Storybook",
    children: (
      <>
        Need&nbsp;a&nbsp;
        <TextRotate
          staggerFrom="last"
          texts={["design", "code", "consultant", "website"]}
        />
        <br />
        for&nbsp;your&nbsp;business?
      </>
    ),
  },
};

export default {
  title: "Organisms/HeroSection",
  component: HeroSection,
  decorators: [(Story) => <div style={{ height: "300dvh" }}>{Story()}</div>],
} satisfies Meta<typeof HeroSection>;
