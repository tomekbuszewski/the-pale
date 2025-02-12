import { translate } from "@utils/translate";

import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import MainImage from "./thebacklog-main.jpg?as=metadata&imagetools-gallery";
import Mobile from "./thebacklog-mobile.jpg?as=metadata&imagetools-gallery";

export default {
  title: "The Backlog",
  date: new Date("2024-01-01"),
  description: translate("work.backlog"),
  tags: [
    translate("work.item.tag.design"),
    translate("work.item.tag.development"),
  ],
  mobileImage: Mobile as unknown as OutputMetadata,
  desktopImage: MainImage as unknown as OutputMetadata,
  background: Background,
} as Work;
