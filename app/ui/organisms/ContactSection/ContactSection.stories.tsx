import type { ContactItem } from "@common-types/ContactItem";
import type { Meta, StoryObj } from "@storybook/react";

import ContactSection from "./ContactSection";

const mockContactItems: ContactItem[] = [
  {
    title: "Get in touch",
    body: ["hello@example.com", "business@example.com"],
    links: [
      {
        label: "Social",
        href: "https://twitter.com/example",
      },
    ],
  },
  {
    title: "Follow me",
    body: ["Twitter", "LinkedIn"],
    links: [
      {
        label: "Social",
        href: "https://twitter.com/example",
      },
    ],
  },
  {
    title: "Location",
    body: ["123 Tech Street", "Digital City, DC 12345"],
    links: [
      {
        label: "Social",
        href: "https://twitter.com/example",
      },
    ],
  },
];

const meta: Meta<typeof ContactSection> = {
  title: "Organisms/ContactSection",
  component: ContactSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
  args: {
    location: "Warsaw, Poland",
    copy: mockContactItems,
  },
};

export const SingleContact: Story = {
  args: {
    location: "Warsaw, Poland",
    copy: [mockContactItems[0]],
  },
};

export const NoContacts: Story = {
  args: {
    location: "Warsaw, Poland",
    copy: [],
  },
};
