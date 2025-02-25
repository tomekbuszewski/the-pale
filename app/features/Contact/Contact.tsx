import { CAL, EMAIL, PHONE } from "@contact";
import { ContactSection as Main } from "@ui/organisms";

import type { ContactItem } from "@common-types/ContactItem";
import { Content } from "@features";

export default function Contact() {
  const translate = Content.hooks.useTranslate();

  const COPY: ContactItem[] = [
    {
      body: translate("contact.section.call.body"),
      title: translate("contact.section.call.title"),
      links: [
        {
          label: translate("contact.section.call.read-more"),
          href: CAL,
        },
      ],
    },
    {
      body: [
        ...translate("contact.section.email.body"),
        translate("footer.feature.contact-disclaimer"),
      ],
      title: translate("contact.section.email.title"),
      links: [
        {
          href: `mailto:${EMAIL}`,
          label: translate("contact.section.email.read-more-email"),
        },
        {
          href: `tel:${PHONE}`,
          variant: "tertiary",
          label: translate("contact.section.email.read-more-phone"),
        },
      ],
    },
  ];

  return (
    <Main
      copy={COPY}
      location={translate("contact.feature.location")}
      title={translate("contact.section.title")}
    />
  );
}
