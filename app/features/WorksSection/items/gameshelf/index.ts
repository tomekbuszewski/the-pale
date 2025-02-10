import { translate } from "@utils/translate";

import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import GameShelfDesktop from "./gameshelf-main.jpg";
import GameShelfMobile from "./gameshelf-mobile.jpg";

export default {
  tags: [
    translate("work-item.tag.design"),
    translate("work-item.tag.development"),
  ],
  description: translate("work.gameshelf"),
  date: new Date("2024-03-01"),
  mobileImage: GameShelfMobile,
  desktopImage: GameShelfDesktop,
  title: "GameShelf",
  background: Background,
} as Work;
