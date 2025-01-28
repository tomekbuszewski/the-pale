import { ClientsSection as Main } from "@ui/organisms";

import type { Client } from "@common-types/Client";

import Finance from "./assets/4f.svg?react";
import Batmaid from "./assets/batmaid.svg?react";
import Beehype from "./assets/beehype.svg?react";
import Chopin from "./assets/chopin.svg?react";
import Incogni from "./assets/incogni.svg?react";
import OLX from "./assets/olx.svg?react";
import Optilyz from "./assets/optilyz.svg?react";
import Parkiet from "./assets/parkiet.svg?react";
import RadioZet from "./assets/radio-zet.svg?react";
import Rp from "./assets/rp.svg?react";
import Szg from "./assets/szg.svg?react";
import Tvn from "./assets/tvn.svg?react";
import Zety from "./assets/zety.svg?react";

const items: Client[] = [
  {
    color: "var(--gradient-radio-zet)",
    name: "Radio Zet",
    component: RadioZet,
  },
  { color: "var(--gradient-olx)", name: "OLX", component: OLX },
  { color: "var(--gradient-optilyz)", name: "optilyz", component: Optilyz },
  { color: "var(--gradient-incogni)", name: "Incogni", component: Incogni },
  { color: "var(--gradient-tvn)", name: "TVN", component: Tvn },
  {
    color: "var(--gradient-chopin-vodka)",
    name: "Chopin Vodka",
    component: Chopin,
  },
  { color: "var(--gradient-beehype)", name: "beehype", component: Beehype },
  { color: "var(--gradient-batmaid)", name: "Batmaid", component: Batmaid },
  { color: "var(--gradient-parkiet)", name: "Parkiet", component: Parkiet },
  {
    color: "var(--gradient-rzeczpospolitapl)",
    name: "Rzeczpospolita.pl",
    component: Rp,
  },
  { color: "var(--gradient-syzygy)", name: "SYZYGY", component: Szg },
  { color: "var(--gradient-zety)", name: "Zety", component: Zety },
  { color: "var(--gradient-4finance)", name: "4Finance", component: Finance },
];

export default function ClientsSection() {
  return <Main items={items} />;
}
