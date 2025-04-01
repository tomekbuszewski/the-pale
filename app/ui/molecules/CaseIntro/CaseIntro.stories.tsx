import { Content } from "@features";
import type { Meta, StoryObj } from "@storybook/react";

import CaseIntro from "./CaseIntro";

const meta: Meta<typeof CaseIntro> = {
  title: "Molecules/CaseIntro",
  component: (props) => (
    <Content.context.Provider value="en">
      <CaseIntro {...props} />
    </Content.context.Provider>
  ),
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CaseIntro>;

export const Default: Story = {
  args: {
    title: "E-commerce Platform Redesign",
    lead: "A complete overhaul of an outdated e-commerce platform, focusing on user experience and conversion optimization.",
    description: [
      "The client approached us with a challenge: their existing e-commerce platform was outdated, difficult to navigate, and had poor conversion rates.",
      "Our team conducted extensive user research, competitive analysis, and stakeholder interviews to understand the pain points and opportunities.",
      "We developed a comprehensive redesign strategy that addressed the core issues while maintaining brand consistency and improving the overall user experience.",
    ],
  },
};

export const WithHTMLContent: Story = {
  args: {
    title: "Mobile Banking App",
    lead: "Creating a <strong>secure</strong> and <em>intuitive</em> mobile banking experience for a leading financial institution.",
    description: [
      "The project began with a <strong>discovery phase</strong> where we identified key user needs and pain points.",
      "Security was paramount, so we implemented <code>biometric authentication</code> and advanced encryption protocols.",
      "The final design featured a <em>clean, minimalist interface</em> with clear visual hierarchy and intuitive navigation patterns.",
    ],
  },
};

export const ShortContent: Story = {
  args: {
    title: "Brand Identity",
    lead: "Refreshing the visual identity for a tech startup entering a competitive market.",
    description: [
      "We created a distinctive and memorable brand identity that reflected the company's innovative approach and core values.",
    ],
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Comprehensive Digital Transformation Strategy and Implementation for a Traditional Manufacturing Company",
    lead: "Guiding a century-old manufacturing business through a complete digital transformation.",
    description: [
      "The client needed to modernize operations while preserving their heritage and craftsmanship values.",
      "We developed a phased approach to digital adoption, focusing on critical business processes first.",
      "The transformation resulted in 35% improved operational efficiency and opened new market opportunities.",
    ],
  },
};
