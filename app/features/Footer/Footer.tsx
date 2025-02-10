import {
  CAL,
  EMAIL,
  GITHUB,
  LINKEDIN,
  PHONE,
  START_YEAR,
  YOUTUBE,
} from "@contact";
import * as nav from "@nav";
import { PageFooter as Main } from "@ui/organisms";
import { resolveHandle } from "@utils/resolveHandle";
import { translate } from "@utils/translate";

import Calendar from "./assets/calendar.svg?react";
import Github from "./assets/gh.svg?react";
import LinkedIn from "./assets/in.svg?react";
import Mail from "./assets/mail.svg?react";
import Phone from "./assets/phone.svg?react";
import YouTube from "./assets/yt.svg?react";

const data = {
  copy: translate("footer.feature.copy") as string,
  quickLinks: [...nav.Pages, ...nav.HeaderNav],
  contact: [
    {
      href: `mailto:${EMAIL}`,
      text: EMAIL,
      icon: <Mail />,
    },
    {
      href: CAL,
      text: translate("footer.feature.call-button") as string,
      icon: <Calendar />,
      external: true,
    },
    {
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      text: PHONE,
      icon: <Phone />,
    },
  ],
  contactDisclaimer: translate("footer.feature.contact-disclaimer") as string,
  socials: [
    {
      href: YOUTUBE,
      text: resolveHandle(YOUTUBE),
      external: true,
      icon: <YouTube />,
    },
    {
      href: LINKEDIN,
      text: resolveHandle(LINKEDIN),
      external: true,
      icon: <LinkedIn />,
    },
    {
      href: GITHUB,
      text: resolveHandle(GITHUB),
      external: true,
      icon: <Github />,
    },
  ],
};

export default function Footer() {
  return (
    <Main
      {...data}
      cookies={translate("footer.section.cookies") as string}
      copyright={
        translate(
          "footer.section.copyright",
          START_YEAR.toString(),
          new Date().getFullYear().toString(),
        ) as string
      }
    />
  );
}
