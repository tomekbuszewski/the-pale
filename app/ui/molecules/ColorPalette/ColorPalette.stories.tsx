import type { Meta, StoryObj } from "@storybook/react";

import ColorPalette from "./ColorPalette";

export default {
  title: "Molecules/ColorPalette",
  component: ColorPalette,
} satisfies Meta<typeof ColorPalette>;

type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {
  args: {
    items: [
      { name: "Primary", value: "#3366FF", dark: true },
      { name: "Secondary", value: "#FF6633" },
      { name: "Accent", value: "#33FF66" },
      { name: "Text", value: "#333333", dark: true },
      { name: "Background", value: "#FFFFFF" },
    ],
  },
};

export const BrandColors: Story = {
  args: {
    items: [
      { name: "Brand Blue", value: "#0055AA" },
      { name: "Brand Red", value: "#DD0000" },
      { name: "Brand Yellow", value: "#FFCC00" },
      { name: "Brand Green", value: "#00AA55" },
      { name: "Brand Purple", value: "#8800AA" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h3>Brand Color Palette</h3>
        <Story />
      </div>
    ),
  ],
};

export const GrayscaleColors: Story = {
  args: {
    items: [
      { name: "White", value: "#FFFFFF" },
      { name: "Light Gray", value: "#EEEEEE" },
      { name: "Medium Gray", value: "#999999" },
      { name: "Dark Gray", value: "#555555" },
      { name: "Black", value: "#000000" },
    ],
  },
};

export const SemanticColors: Story = {
  args: {
    items: [
      { name: "Success", value: "#28A745" },
      { name: "Warning", value: "#FFC107" },
      { name: "Danger", value: "#DC3545" },
      { name: "Info", value: "#17A2B8" },
      { name: "Neutral", value: "#6C757D" },
    ],
    className: "semantic-palette",
  },
};
