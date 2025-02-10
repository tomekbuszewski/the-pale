import { translate } from "@utils/translate";

import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import MainImage from "./hay24-main.jpg";
import Mobile from "./hay24-mobile.jpg";

export default {
  tags: [
    translate("work-item.tag.design"),
    translate("work-item.tag.development"),
  ],
  description: translate("work.hay"),
  date: new Date("2024-02-01"),
  mobileImage: Mobile,
  desktopImage: MainImage,
  background: Background,
  title: "Hundred a Year",
} as Work;
