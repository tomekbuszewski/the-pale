import { PageFooter as Main } from "@ui/organisms";

import Calendar from "./assets/calendar.svg?react";
import Github from "./assets/gh.svg?react";
import LinkedIn from "./assets/in.svg?react";
import Mail from "./assets/mail.svg?react";
import Phone from "./assets/phone.svg?react";
import YouTube from "./assets/yt.svg?react";

const data = {
  copy: "Buszewski.studio is a solo-agency ran by Tomasz Buszewski, former tech lead and manager.",
  quickLinks: [
    {
      href: "#about",
      text: "About",
    },
    {
      href: "#services",
      text: "Services",
    },
    {
      href: "#videos",
      text: "Videos & Writings",
    },
    {
      href: "#contact",
      text: "Contact",
    },
  ],
  contact: [
    {
      href: "mailto:tomasz@buszewski.com",
      text: "tomasz@buszewski.com",
      icon: <Mail />,
    },
    {
      href: "https://cal.com/buszewski/intro",
      text: "30-minute intro call",
      icon: <Calendar />,
    },
    {
      href: "tel:+48784851146",
      text: "+48 784 851 146",
      icon: <Phone />,
    },
  ],
  contactDisclaimer:
    "I'll get back to you within 24 hours, but usually much sooner (Mon-Fri).",
  socials: [
    {
      href: "https://youtube.com/@tomaszbuszewski",
      text: "@tomaszbuszewski",
      icon: <YouTube />,
    },
    {
      href: "https://linkedin.com/in/tomek-buszewski/",
      text: "tomek-buszewski",
      icon: <LinkedIn />,
    },
    {
      href: "https://github.com/tomekbuszewski/",
      text: "tomekbuszewski",
      icon: <Github />,
    },
  ],
};

export default function Footer() {
  return <Main {...data} />;
}
