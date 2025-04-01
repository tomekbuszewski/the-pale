import type { Meta, StoryObj } from "@storybook/react";

import CaseImages from "./CaseImages";

const meta: Meta<typeof CaseImages> = {
  title: "Molecules/CaseImages",
  component: CaseImages,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light-gray",
      values: [{ name: "light-gray", value: "#ccc" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300dvh", paddingTop: "100dvh" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CaseImages>;

const sampleImages = [
  "https://placehold.co/300x400/3498db/ffffff",
  "https://placehold.co/300x400/e74c3c/ffffff",
  "https://placehold.co/300x400/2ecc71/ffffff",
  "https://placehold.co/300x400/f39c12/ffffff",
  "https://placehold.co/300x400/9b59b6/ffffff",
  "https://placehold.co/300x400/1abc9c/ffffff",
];

export const Desktop: Story = {
  args: {
    mode: "desktop",
    background: "#333",
    project: "www.project.com",
    title: "Project Gallery",
    description: [
      "Our design process involved multiple iterations and user testing.",
      "The final product showcases attention to detail and user-centered design principles.",
    ],
    images: sampleImages,
  },
};

export const Tablet: Story = {
  args: {
    mode: "tablet",
    background: "#333",
    project: "www.project.com",
    title: "Design Explorations",
    description: [
      "We explored various design directions before settling on the final approach.",
      "Each iteration was tested with real users to ensure optimal experience.",
    ],
    images: sampleImages,
  },
};

export const Mobile: Story = {
  args: {
    project: "www.project.com",
    background: "#333",
    mode: "mobile",
    title: "Mobile Experience",
    description: [
      "The mobile experience was designed with touch interactions in mind.",
      "We optimized the interface for smaller screens without compromising functionality.",
    ],
    images: sampleImages,
  },
};

export const WithHTMLInDescription: Story = {
  args: {
    mode: "desktop",
    background: "#333",
    title: "Technical Implementation",
    description: [
      "We used <strong>React</strong> for the frontend implementation.",
      "The design system was built with <em>CSS Modules</em> and <code>SCSS</code>.",
    ],
    images: sampleImages.slice(0, 4),
  },
};
