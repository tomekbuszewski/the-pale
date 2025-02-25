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
import { Content } from "@features";

import Calendar from "./assets/calendar.svg?react";
import Github from "./assets/gh.svg?react";
import LinkedIn from "./assets/in.svg?react";
import Mail from "./assets/mail.svg?react";
import Phone from "./assets/phone.svg?react";
import YouTube from "./assets/yt.svg?react";
import { useContext } from "react";

const languages = [
  {
    label: "EN",
    href: "en",
  },
  {
    label: "PL",
    href: "pl",
  },
];

export default function Footer() {
  const translate = Content.hooks.useTranslate();
  const language = useContext(Content.context);

  const data = {
    copy: translate("footer.feature.copy"),
    quickLinks: [...nav.Pages, ...nav.HeaderNav]
      .map(({ label, href }) => ({
        href,
        label: translate(label),
      }))
      .filter(({ label }) => label !== ""),
    contact: [
      {
        href: `mailto:${EMAIL}`,
        label: EMAIL,
        icon: <Mail />,
      },
      {
        href: CAL,
        label: translate("footer.feature.call-button"),
        icon: <Calendar />,
        external: true,
      },
      {
        href: `tel:${PHONE.replace(/\s/g, "")}`,
        label: PHONE,
        icon: <Phone />,
      },
    ],
    contactDisclaimer: translate("footer.feature.contact-disclaimer"),
    socials: [
      {
        href: YOUTUBE,
        label: resolveHandle(YOUTUBE),
        external: true,
        icon: <YouTube />,
      },
      {
        href: LINKEDIN,
        label: resolveHandle(LINKEDIN),
        external: true,
        icon: <LinkedIn />,
      },
      {
        href: GITHUB,
        label: resolveHandle(GITHUB),
        external: true,
        icon: <Github />,
      },
    ],
  };

  return (
    <Main
      {...data}
      onLanguageChange={Content.functions.handleLanguageChange(language)}
      languages={languages}
      cookies={translate("footer.section.cookies")}
      copyright={translate(
        "footer.section.copyright",
        START_YEAR.toString(),
        new Date().getFullYear().toString(),
      )}
    />
  );
}
