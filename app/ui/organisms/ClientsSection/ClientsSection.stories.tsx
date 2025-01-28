import type { Meta, StoryObj } from "@storybook/react";

import RadioZet from "./assets/radio-zet.svg?react";
import ClientsSection from "./ClientsSection";

export const Primary: StoryObj<typeof ClientsSection> = {
  args: {
    items: [
      {
        color: "var(--gradient-radio-zet)",
        name: "Radio Zet",
        component: RadioZet,
      },
      { color: "var(--gradient-olx)", name: "OLX", component: RadioZet },
      {
        color: "var(--gradient-optilyz)",
        name: "optilyz",
        component: RadioZet,
      },
      {
        color: "var(--gradient-incogni)",
        name: "Incogni",
        component: RadioZet,
      },
      { color: "var(--gradient-tvn)", name: "TVN", component: RadioZet },
      {
        color: "var(--gradient-chopin-vodka)",
        name: "Chopin Vodka",
        component: RadioZet,
      },
      {
        color: "var(--gradient-beehype)",
        name: "beehype",
        component: RadioZet,
      },
      {
        color: "var(--gradient-batmaid)",
        name: "Batmaid",
        component: RadioZet,
      },
      {
        color: "var(--gradient-parkiet)",
        name: "Parkiet",
        component: RadioZet,
      },
      {
        color: "var(--gradient-rzeczpospolitapl)",
        name: "Rzeczpospolita.pl",
        component: RadioZet,
      },
      { color: "var(--gradient-syzygy)", name: "SYZYGY", component: RadioZet },
      { color: "var(--gradient-zety)", name: "Zety", component: RadioZet },
      {
        color: "var(--gradient-4finance)",
        name: "4Finance",
        component: RadioZet,
      },
    ],
  },
};

export default {
  title: "Organisms/ClientsSection",
  component: ClientsSection,
} satisfies Meta<typeof ClientsSection>;
