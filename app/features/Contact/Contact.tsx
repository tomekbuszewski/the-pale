import { CAL, EMAIL } from "@contact";
import { ContactSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import type { ContactItem } from "@common-types/ContactItem";

const COPY: ContactItem[] = [
  {
    TITLE: translate("contact-section.call.title") as string,
    BODY: translate("contact-section.call.body") as string[],
    LINK: CAL,
    READ_MORE: translate("contact-section.call.read-more") as string,
  },
  {
    TITLE: translate("contact-section.email.title") as string,
    BODY: [
      ...translate("contact-section.email.body"),
      translate("footer-feature.contact-disclaimer"),
    ] as string[],
    LINK: EMAIL,
    READ_MORE: translate("contact-section.email.read-more") as string,
  },
];

export default function Contact() {
  return (
    <Main
      copy={COPY}
      location={translate("contact-feature.location") as string}
    />
  );
}
