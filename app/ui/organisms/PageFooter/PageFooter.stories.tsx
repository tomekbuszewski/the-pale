import type { Meta, StoryObj } from "@storybook/react";

import Mail from "./assets/mail.svg?react";
import PageFooter from "./PageFooter";

export const Primary: StoryObj<typeof PageFooter> = {
  args: {
    copy: "Buszewski.com is a solo-agency ran by Tomasz Buszewski, former tech lead and manager.",
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
        href: "mailto:tomasz@buszewski.com",
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
  },
};

export default {
  title: "Organisms/PageFooter",
  component: PageFooter,
  decorators: [
    (Story) => (
      <>
        <div
          style={{
            height: "125dvh",
            backgroundColor: "#fff",
            zIndex: 10,
            position: "relative",
          }}
        />
        {Story()}
      </>
    ),
  ],
} satisfies Meta<typeof PageFooter>;
