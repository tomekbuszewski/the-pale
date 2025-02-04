import { Button, SectionWrapper } from "@ui/atoms";

import type { Meta, StoryObj } from "@storybook/react";

import LargeCard from "./LargeCard";

const meta: Meta<typeof LargeCard> = {
  title: "Molecules/LargeCard",
  component: LargeCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SectionWrapper>
        <Story />
      </SectionWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LargeCard>;

export const Default: Story = {
  args: {
    title: "Default Title",
    description: (
      <p>This is a default description for the LargeCard component.</p>
    ),
    body: <div>This is the default body content.</div>,
  },
};

export const WithMoreButton: Story = {
  args: {
    title: "Card with More Button",
    description: <p>This card includes a “Learn More” button.</p>,
    more: {
      href: "/learn-more",
      label: "Learn More",
    },
    body: <div>This is the body content with a “Learn More” button.</div>,
  },
};

export const WithoutMoreButton: Story = {
  args: {
    title: "Card without More Button",
    description: <p>This card does not include a “Learn More” button.</p>,
    body: <div>This is the body content without a “Learn More” button.</div>,
  },
};

export const WithCustomBody: Story = {
  args: {
    title: "Card with Custom Body",
    description: <p>This card has custom body content.</p>,
    body: (
      <div>
        <p>This is a custom paragraph inside the body.</p>
        <Button to="/custom-action" variant="secondary">
          Custom Action
        </Button>
      </div>
    ),
  },
};
