import { CAL, EMAIL } from "@contact";
import { ContactSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import type { ContactItem } from "@common-types/ContactItem";

const COPY: ContactItem[] = [
  {
    title: translate("contact.section.call.title"),
    body: translate("contact.section.call.body"),
    href: CAL,
    label: translate("contact.section.call.read-more"),
  },
  {
    title: translate("contact.section.email.title"),
    body: [
      ...translate("contact.section.email.body"),
      translate("footer.feature.contact-disclaimer"),
    ] as string[],
    href: EMAIL,
    label: translate("contact.section.email.read-more"),
  },
];

export default function Contact() {
  return <Main copy={COPY} location={translate("contact.feature.location")} />;
}
