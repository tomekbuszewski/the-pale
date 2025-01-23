import type { Meta, StoryObj } from "@storybook/react";

import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Hero: Story = {
  args: {
    children: "Hero Text Example",
    variant: "hero",
  },
};

export const Regular: Story = {
  args: {
    children: "Regular Text Example",
    variant: "regular",
  },
};

export const Small: Story = {
  args: {
    children: "Small Text Example",
    variant: "small",
  },
};

export const Highlight: Story = {
  args: {
    children: "Highlight Text Example",
    variant: "highlight",
  },
};

export const SectionHeading: Story = {
  args: {
    children: "Section Heading Example",
    variant: "section-heading",
  },
};

export const Title: Story = {
  args: {
    children: "Title Example",
    variant: "title",
  },
};

export const Button: Story = {
  args: {
    children: "Button Text Example",
    variant: "button",
  },
};

export const List: Story = {
  args: {
    children: "List Item Example",
    variant: "list",
  },
};

export const About: Story = {
  args: {
    children: "About Text Example",
    variant: "about",
  },
};

export const Work: Story = {
  args: {
    children: "Work Title Example",
    variant: "work",
  },
};
