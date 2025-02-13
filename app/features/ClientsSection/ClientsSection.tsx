import { lazy } from "react";
import { ClientsSection as Main } from "@ui/organisms";

import type { Client } from "@common-types/Client";

const Finance = lazy(() => import("./assets/4f.svg?react"));
const Batmaid = lazy(() => import("./assets/batmaid.svg?react"));
const Beehype = lazy(() => import("./assets/beehype.svg?react"));
const Chopin = lazy(() => import("./assets/chopin.svg?react"));
const Incogni = lazy(() => import("./assets/incogni.svg?react"));
const OLX = lazy(() => import("./assets/olx.svg?react"));
const Optilyz = lazy(() => import("./assets/optilyz.svg?react"));
const Parkiet = lazy(() => import("./assets/parkiet.svg?react"));
const RadioZet = lazy(() => import("./assets/radio-zet.svg?react"));
const Rp = lazy(() => import("./assets/rp.svg?react"));
const Szg = lazy(() => import("./assets/szg.svg?react"));
const Tvn = lazy(() => import("./assets/tvn.svg?react"));
const Zety = lazy(() => import("./assets/zety.svg?react"));

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
