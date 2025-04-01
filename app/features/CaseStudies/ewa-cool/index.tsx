import { Fragment } from "react";
import { CAL } from "@contact";
import { Content } from "@features";

import { SectionWrapper } from "@ui/atoms";
import {
  CaseDescription,
  CaseIllustration,
  CaseImages,
  CaseIntro,
  ColorPalette,
  ContactCta,
  LargeCard,
} from "@ui/molecules";

import DesktopImage1 from "./mainpage-1-desktop.webp?url";
import DesktopImage5 from "./mainpage-1-desktop-dark.webp?url";
import MobileImage1 from "./mainpage-1-mobile.webp?url";
import MobileImage5 from "./mainpage-1-mobile-dark.webp?url";
import DesktopImage2 from "./mainpage-2-desktop.webp?url";
import DesktopImage6 from "./mainpage-2-desktop-dark.webp?url";
import MobileImage2 from "./mainpage-2-mobile.webp?url";
import MobileImage6 from "./mainpage-2-mobile-dark.webp?url";
import DesktopImage3 from "./mainpage-3-desktop.webp?url";
import DesktopImage7 from "./mainpage-3-desktop-dark.webp?url";
import MobileImage3 from "./mainpage-3-mobile.webp?url";
import MobileImage7 from "./mainpage-3-mobile-dark.webp?url";
import DesktopImage4 from "./mainpage-4-desktop.webp?url";
import DesktopImage8 from "./mainpage-4-desktop-dark.webp?url";
import MobileImage4 from "./mainpage-4-mobile.webp?url";
import MobileImage8 from "./mainpage-4-mobile-dark.webp?url";
import SketchesImage from "./sketches.webp?url";
import TypographyImage from "./typography.webp";

export default function EwaCool() {
  const translate = Content.hooks.useTranslate();

  const COPY = {
    TITLE: translate("cases.ewa-cool.title"),
    LEAD: translate("cases.ewa-cool.desc"),
    DESCRIPTION: translate("cases.ewa-cool.body"),

    SKETCH: {
      TITLE: translate("cases.ewa-cool.sections.sketches.title"),
      CARD_TITLE: translate("cases.ewa-cool.sections.sketches.card.title"),
      CARD_DESC: translate("cases.ewa-cool.sections.sketches.card.desc"),
    },

    TECH: {
      TITLE: translate("cases.ewa-cool.sections.tech.title"),
      DESC: translate("cases.ewa-cool.sections.tech.desc"),
      CARD_TITLE: translate("cases.ewa-cool.sections.tech.card.title"),
      CARD_DESC: translate("cases.ewa-cool.sections.tech.card.desc"),
    },

    MOBILE: {
      TITLE: translate("cases.ewa-cool.sections.mobile.card.title"),
      DESC: translate("cases.ewa-cool.sections.mobile.card.desc"),
    },

    COLORS: {
      TITLE: translate("cases.ewa-cool.sections.colors.card.title"),
      DESC: translate("cases.ewa-cool.sections.colors.card.desc"),
    },

    TYPOGRAPHY: {
      TITLE: translate("cases.ewa-cool.sections.typography.card.title"),
      DESC: translate("cases.ewa-cool.sections.typography.card.desc"),
    },

    DESKTOP: {
      TITLE: translate("cases.ewa-cool.sections.desktop.card.title"),
      DESC: translate("cases.ewa-cool.sections.desktop.card.desc"),
    },

    CTA: {
      TITLE: translate("cases.contact-card.text"),
      BTN_MAIN: translate("cases.contact-card.button-main"),
      BTN_MINOR: translate("cases.contact-card.button-minor"),
    },
  };

  return (
    <Fragment>
      <CaseIntro
        title={COPY.TITLE}
        lead={COPY.LEAD}
        description={COPY.DESCRIPTION}
      />

      <CaseIllustration
        title={COPY.SKETCH.TITLE}
        subtitle={COPY.SKETCH.CARD_TITLE}
        description={COPY.SKETCH.CARD_DESC}
        background={SketchesImage}
      />

      <CaseDescription
        title={COPY.TECH.TITLE}
        description={COPY.TECH.DESC}
        card={{ title: COPY.TECH.CARD_TITLE, description: COPY.TECH.CARD_DESC }}
      />

      <CaseImages
        project="www.ewa.cool"
        mode="mobile"
        images={[
          MobileImage1,
          MobileImage2,
          MobileImage3,
          MobileImage4,
          MobileImage5,
          MobileImage6,
          MobileImage7,
          MobileImage8,
        ]}
        title={COPY.MOBILE.TITLE}
        description={COPY.MOBILE.DESC}
        background="#294A38"
      />

      <SectionWrapper collapse>
        <LargeCard
          contentCentered
          title={COPY.COLORS.TITLE}
          description={COPY.COLORS.DESC}
          body={
            <ColorPalette
              items={[
                { value: "#F2F8F3", name: "Background" },
                { value: "#DCEBDE", name: "Highlight" },
                { value: "#4A5A50", name: "Body" },
                { value: "#294A38", name: "Headings" },
                { value: "#E97D3C", name: "Accent" },
              ]}
            />
          }
        />
      </SectionWrapper>

      <SectionWrapper collapse>
        <LargeCard
          align="right"
          contentCentered
          title={COPY.TYPOGRAPHY.TITLE}
          description={COPY.TYPOGRAPHY.DESC}
          body={<img src={TypographyImage} alt={COPY.TYPOGRAPHY.TITLE} />}
        />
      </SectionWrapper>

      <CaseImages
        project="www.ewa.cool"
        mode="desktop"
        images={[
          DesktopImage1,
          DesktopImage2,
          DesktopImage3,
          DesktopImage4,
          DesktopImage5,
          DesktopImage6,
          DesktopImage7,
          DesktopImage8,
        ]}
        title={COPY.DESKTOP.TITLE}
        description={COPY.DESKTOP.DESC}
        background="#294A38"
      />

      <SectionWrapper>
        <ContactCta
          text={COPY.CTA.TITLE}
          buttons={[
            { label: COPY.CTA.BTN_MAIN, href: CAL, variant: "primary" },
            {
              label: COPY.CTA.BTN_MINOR,
              href: "#contact",
              variant: "secondary",
            },
          ]}
        />
      </SectionWrapper>
    </Fragment>
  );
}
