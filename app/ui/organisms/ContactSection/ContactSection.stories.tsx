import type { ContactItem } from "@common-types/ContactItem";
import type { Meta, StoryObj } from "@storybook/react";

import ContactSection from "./ContactSection";

const mockContactItems: ContactItem[] = [
  {
    label: "Email",
    title: "Get in touch",
    body: ["hello@example.com", "business@example.com"],
    href: "mailto:hello@example.com",
  },
  {
    label: "Social",
    title: "Follow me",
    body: ["Twitter", "LinkedIn"],
    href: "https://twitter.com/example",
  },
  {
    label: "Address",
    title: "Location",
    body: ["123 Tech Street", "Digital City, DC 12345"],
    href: "https://maps.google.com",
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
