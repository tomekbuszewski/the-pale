import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import GameShelfDesktop from "./gameshelf-main.jpg";
import GameShelfMobile from "./gameshelf-mobile.jpg";

export default {
  tags: ["Design", "Development"],
  description: [
    "Gameshelf aims to deliver latest new, world-class columns, interviews and insides for all the gamers around the world.",
  ],
  date: new Date("2024-03-01"),
  mobileImage: GameShelfMobile,
  desktopImage: GameShelfDesktop,
  title: "GameShelf",
  background: Background,
} as Work;
