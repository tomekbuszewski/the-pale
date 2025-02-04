import type { Meta, StoryObj } from "@storybook/react";

import ContactCta from "./ContactCta";

const meta: Meta<typeof ContactCta> = {
  title: "Molecules/ContactCta",
  component: ContactCta,
  tags: ["autodocs"],
  argTypes: {
    buttons: {
      control: {
        type: "object",
      },
      description:
        "Array of button objects with label, href, and variant properties.",
    },
    className: {
      control: {
        type: "text",
      },
      description: "Additional CSS class for the root element.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContactCta>;

// Default story
export const Default: Story = {
  args: {
    buttons: [
      { label: "Get Started", href: "/start", variant: "primary" },
      { label: "Learn More", href: "/learn", variant: "secondary" },
    ],
  },
};

// Story with custom class name
export const WithCustomClassName: Story = {
  args: {
    buttons: [
      { label: "Sign Up", href: "/signup", variant: "primary" },
      { label: "Contact Us", href: "/contact", variant: "tertiary" },
    ],
    className: "custom-class",
  },
};

// Story with a single button
export const SingleButton: Story = {
  args: {
    buttons: [{ label: "Explore", href: "/explore", variant: "secondary" }],
  },
};

// Story with multiple buttons
export const MultipleButtons: Story = {
  args: {
    buttons: [
      { label: "Get Started", href: "/start", variant: "primary" },
      { label: "Learn More", href: "/learn", variant: "secondary" },
      { label: "Contact Us", href: "/contact", variant: "tertiary" },
    ],
  },
};
