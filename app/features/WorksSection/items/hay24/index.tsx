import { translate } from "@utils/translate";

import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import MainImage from "./hay24-main.jpg?as=metadata&imagetools-gallery";
import Mobile from "./hay24-mobile.jpg?as=metadata&imagetools-gallery";

export default {
  tags: [
    translate("work.item.tag.design"),
    translate("work.item.tag.development"),
  ],
  description: translate("work.hay"),
  date: new Date("2024-02-01"),
  mobileImage: Mobile as unknown as OutputMetadata,
  desktopImage: MainImage as unknown as OutputMetadata,
  background: Background,
  title: "Hundred a Year",
} as Work;
