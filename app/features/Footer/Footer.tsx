import { CAL, EMAIL, PHONE } from "@contact";
import * as nav from "@nav";
import { PageFooter as Main } from "@ui/organisms";

import Calendar from "./assets/calendar.svg?react";
import Github from "./assets/gh.svg?react";
import LinkedIn from "./assets/in.svg?react";
import Mail from "./assets/mail.svg?react";
import Phone from "./assets/phone.svg?react";
import YouTube from "./assets/yt.svg?react";

const data = {
  copy: "Buszewski.com is a solo-agency ran by Tomasz Buszewski, former tech lead and manager.",
  quickLinks: [...nav.Pages, ...nav.HeaderNav],
  contact: [
    {
      href: `mailto:${EMAIL}`,
      text: EMAIL,
      icon: <Mail />,
    },
    {
      href: CAL,
      text: "30-minute intro call",
      icon: <Calendar />,
      external: true,
    },
    {
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      text: PHONE,
      icon: <Phone />,
    },
  ],
  contactDisclaimer:
    "I'll get back to you within 24 hours, but usually much sooner (Mon-Fri).",
  socials: [
    {
      href: "https://youtube.com/@tomaszbuszewski",
      text: "@tomaszbuszewski",
      external: true,
      icon: <YouTube />,
    },
    {
      href: "https://linkedin.com/in/tomek-buszewski/",
      text: "tomek-buszewski",
      external: true,
      icon: <LinkedIn />,
    },
    {
      href: "https://github.com/tomekbuszewski/",
      text: "tomekbuszewski",
      external: true,
      icon: <Github />,
    },
  ],
};

export default function Footer() {
  return <Main {...data} />;
}
