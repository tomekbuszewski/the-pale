import type { Meta, StoryObj } from "@storybook/react";

import CaseIllustration from "./CaseIllustration";

const meta: Meta<typeof CaseIllustration> = {
  title: "Molecules/CaseIllustration",
  component: CaseIllustration,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CaseIllustration>;

export const WithColorBackground: Story = {
  args: {
    title: "Project Overview",
    subtitle: "The Challenge",
    description: [
      "We needed to create a responsive design system that works across all devices.",
      "The client required a modern look with accessibility in mind.",
      "Performance was a key metric for this project.",
    ],
    background: "#f5f5f5",
  },
};

export const WithImageBackground: Story = {
  args: {
    title: "Case Study",
    subtitle: "Solution Approach",
    description: [
      "Our team implemented a component-based architecture.",
      "We utilized modern CSS techniques including Grid and Flexbox.",
      "The final product achieved a 98% performance score on Lighthouse.",
    ],
    background:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
};

export const WithHTMLInDescription: Story = {
  args: {
    title: "Technical Details",
    subtitle: "Implementation",
    description: [
      "We used <strong>React</strong> for the frontend implementation.",
      "The backend was built with <em>Node.js</em> and <em>Express</em>.",
      'Data was stored in a <a href="#">MongoDB database</a> for flexibility.',
    ],
    background: "#e6f7ff",
  },
};
