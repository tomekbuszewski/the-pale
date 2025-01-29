import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import MainImage from "./hay24-main.jpg";
import Mobile from "./hay24-mobile.jpg";

export default {
  tags: ["Design", "Development"],
  description: [
    "Hundred a Year is a personal project for creating and curating end-of-the-year music lists.",
  ],
  date: new Date("2024-02-01"),
  mobileImage: Mobile,
  desktopImage: MainImage,
  background: Background,
  title: "Hundred a Year",
} as Work;
