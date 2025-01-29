import type { Work } from "@common-types/Work";

import Background from "./background.jpg";
import MainImage from "./thebacklog-main.jpg";
import Mobile from "./thebacklog-mobile.jpg";

export default {
  title: "The Backlog",
  date: new Date("2024-01-01"),
  description: [
    "The Backlog aims to provide microblogging experience ehnaced with gaming features, like ratings, statuses and title tagging.",
  ],
  tags: ["Development", "Design"],
  mobileImage: Mobile,
  desktopImage: MainImage,
  background: Background,
} as Work;
