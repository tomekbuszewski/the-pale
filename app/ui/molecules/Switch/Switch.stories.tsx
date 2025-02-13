import type { Meta, StoryObj } from "@storybook/react";

import Switch from "./Switch";

export const Primary: StoryObj<typeof Switch> = {
  args: {
    items: [
      { label: "PL", href: "pl" },
      { label: "EN", href: "en" },
    ],
    onChange: console.log,
  },
};

export const WithManyChoices: StoryObj<typeof Switch> = {
  args: {
    items: [
      { label: "PL", href: "pl" },
      { label: "EN", href: "en" },
      { label: "DE", href: "de" },
      { label: "FR", href: "fr" },
      { label: "ES", href: "es" },
      { label: "IT", href: "it" },
      { label: "NL", href: "nl" },
      { label: "PT", href: "pt" },
      { label: "RU", href: "ru" },
      { label: "ZH", href: "zh" },
    ],
    onChange: console.log,
  },
};

export default {
  title: "Molecules/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;
