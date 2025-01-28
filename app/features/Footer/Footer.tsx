import { PageFooter as Main } from "@ui/organisms";

import Mail from "./assets/mail.svg?react";

const data = {
  copy: "Buszewski.studio is a solo-agency ran by Tomasz Buszewski, former tech lead and manager.",
  quickLinks: [
    {
      href: "#",
      text: "About",
    },
    {
      href: "#",
      text: "Services",
    },
    {
      href: "#",
      text: "Blog",
    },
    {
      href: "#",
      text: "Contact",
    },
  ],
  contact: [
    {
      href: "mailto:tomasz@buszewski.studio",
      text: "tomasz@buszewski.com",
      icon: <Mail />,
    },
  ],
  contactDisclaimer:
    "I'll get back to you within 24 hours, but usually much sooner (Mon-Fri).",
  socials: [
    {
      href: "https://www.linkedin.com",
      text: "tomek-buszewski",
      icon: <Mail />,
    },
  ],
};

export default function Footer() {
  return <Main {...data} />;
}
