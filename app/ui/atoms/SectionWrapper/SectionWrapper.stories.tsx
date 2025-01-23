import type { Meta, StoryObj } from "@storybook/react";

import SectionWrapper from "./SectionWrapper";

const meta: Meta<typeof SectionWrapper> = {
  title: "Atoms/Section Wrapper",
  component: SectionWrapper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionWrapper>;

export const Header: Story = {
  args: {
    children: "Hero Text Example",
    tag: "header",
  },
};

export const Section: Story = {
  args: {
    children: "Hero Text Example",
  },
};

export const SectionWithTitle: Story = {
  args: {
    children: "Hero Text Example",
    title: "Hello from section",
  },
};

export const WithLeftBreakout: Story = {
  args: {
    children: <div style={{ background: "red" }}>Hero Text Example</div>,
    breakout: "left",
  },
};

export const WithRightBreakout: Story = {
  args: {
    children: <div style={{ background: "red" }}>Hero Text Example</div>,
    breakout: "right",
  },
};
