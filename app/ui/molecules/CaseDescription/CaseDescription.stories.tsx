import type { Meta, StoryObj } from "@storybook/react";

import CaseDescription from "./CaseDescription";

const meta: Meta<typeof CaseDescription> = {
  title: "Molecules/CaseDescription",
  component: CaseDescription,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CaseDescription>;

export const Default: Story = {
  args: {
    title: "Project Description",
    description: [
      "This project aimed to create a modern web application with a focus on user experience.",
      "We implemented a responsive design that works across all device sizes.",
      "The application was built using React and TypeScript for type safety.",
    ],
  },
};

export const WithCard: Story = {
  args: {
    title: "Technical Overview",
    description: [
      "The application architecture follows a component-based approach.",
      "We utilized modern state management techniques to ensure data consistency.",
      "Performance optimizations were implemented throughout the codebase.",
    ],
    card: {
      title: "Technologies Used",
      description: [
        "React 18",
        "TypeScript",
        "CSS Modules",
        "Jest for testing",
      ],
    },
  },
};

export const WithHTMLContent: Story = {
  args: {
    title: "Implementation Details",
    description: [
      "The frontend was built with <strong>React</strong> and <em>TypeScript</em>.",
      'We used <a href="#">CSS Modules</a> for styling components.',
      "The project follows the <code>atomic design</code> methodology.",
    ],
    card: {
      title: "Key Features",
      description: [
        "Responsive design",
        "Accessibility compliance",
        "Performance optimization",
      ],
    },
  },
};
