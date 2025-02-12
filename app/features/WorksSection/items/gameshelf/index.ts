import { translate } from "@utils/translate";

import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import GameShelfDesktop from "./gameshelf-main.jpg?as=metadata&imagetools-gallery";
import GameShelfMobile from "./gameshelf-mobile.jpg?as=metadata&imagetools-gallery";

export default {
  tags: [
    translate("work.item.tag.design"),
    translate("work.item.tag.development"),
  ],
  description: translate("work.gameshelf"),
  date: new Date("2024-03-01"),
  mobileImage: GameShelfMobile,
  desktopImage: GameShelfDesktop as unknown as OutputMetadata,
  title: "GameShelf",
  background: Background,
} as unknown as Work;
