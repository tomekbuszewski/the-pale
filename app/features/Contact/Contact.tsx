import { CAL, EMAIL } from "@contact";
import { ContactSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import type { ContactItem } from "@common-types/ContactItem";

const COPY: ContactItem[] = [
  {
    TITLE: translate("contact.section.call.title"),
    BODY: translate("contact.section.call.body"),
    LINK: CAL,
    READ_MORE: translate("contact.section.call.read-more"),
  },
  {
    TITLE: translate("contact.section.email.title"),
    BODY: [
      ...translate("contact.section.email.body"),
      translate("footer.feature.contact-disclaimer"),
    ] as string[],
    LINK: EMAIL,
    READ_MORE: translate("contact.section.email.read-more"),
  },
];

export default function Contact() {
  return (
    <Main
      copy={COPY}
      location={translate("contact.feature.location")}
    />
  );
}
