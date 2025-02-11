import type { Meta, StoryObj } from "@storybook/react";

import Switch from "./Switch";

export const Primary: StoryObj<typeof Switch> = {
  args: {
    items: [
      { label: "PL", value: "pl" },
      { label: "EN", value: "en" },
    ],
    onChange: console.log,
  },
};

export const WithManyChoices: StoryObj<typeof Switch> = {
  args: {
    items: [
      { label: "PL", value: "pl" },
      { label: "EN", value: "en" },
      { label: "DE", value: "de" },
      { label: "FR", value: "fr" },
      { label: "ES", value: "es" },
      { label: "IT", value: "it" },
      { label: "NL", value: "nl" },
      { label: "PT", value: "pt" },
      { label: "RU", value: "ru" },
      { label: "ZH", value: "zh" },
    ],
    onChange: console.log,
  },
};

export default {
  title: "Molecules/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;
