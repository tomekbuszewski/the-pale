import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import GameShelfDesktop from "./gameshelf-main.jpg?as=metadata&imagetools-gallery";
import GameShelfMobile from "./gameshelf-mobile.jpg?as=metadata&imagetools-gallery";

export default {
  tags: ["work.item.tag.design", "work.item.tag.development"] as const,
  description: "work.gameshelf",
  date: new Date("2024-03-01"),
  mobileImage: GameShelfMobile,
  desktopImage: GameShelfDesktop as unknown as OutputMetadata,
  title: "GameShelf",
  background: Background,
} as unknown as Work;
