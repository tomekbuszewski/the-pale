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

export const H2: Story = {
  args: {
    children: "H2 Heading Example",
    variant: "h2",
  },
};

export const H3: Story = {
  args: {
    children: "H3 Heading Example",
    variant: "h3",
  },
};

export const H4: Story = {
  args: {
    children: "H4 Heading Example",
    variant: "h4",
  },
};

export const Blockquote: Story = {
  args: {
    children: "Blockquote Example Text",
    variant: "blockquote",
  },
};

export const ArticleBody: Story = {
  args: {
    children: "Article Body Text Example",
    variant: "article-body",
  },
};

export const UnorderedList: Story = {
  args: {
    children: "Unordered List Item Example",
    variant: "ul",
  },
};

export const MonoText: Story = {
  args: {
    children: "Monospace Text Example",
    variant: "regular",
    mono: true,
  },
};

export const BoldColoredText: Story = {
  args: {
    children: "Bold Colored Text Example",
    variant: "regular",
    bold: true,
    color: "accent",
  },
};

export const CenteredText: Story = {
  args: {
    children: "Centered Text Example",
    variant: "regular",
    align: "center",
  },
};
