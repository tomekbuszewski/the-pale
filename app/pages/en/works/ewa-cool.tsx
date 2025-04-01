import { Fragment } from "react";
import { Content } from "@features";
import clsx from "clsx";

import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, Box, List, SectionHeader } from "@ui/molecules";

import mobileMain from "../../works/ewa-cool/mobile-main.webp";
import mobileDark from "../../works/ewa-cool/mobile-main-dark.webp";
import mobileMenu from "../../works/ewa-cool/mobile-main-menu.webp";
import sketches from "../../works/ewa-cool/sketches.webp";

import globals from "../../pages.module.scss";

export default function Work() {
  const translate = Content.hooks.useTranslate();

  const COPY = {
    TITLE: translate("cases.ewa-cool.title"),
    INTRO: translate("cases.ewa-cool.desc"),
    BODY: translate("cases.ewa-cool.body"),

    SECTIONS: {
      SKETCHES: {
        TITLE: translate("cases.ewa-cool.sections.sketches.title"),
        CARD: {
          TITLE: translate("cases.ewa-cool.sections.sketches.card.title"),
          DESC: translate("cases.ewa-cool.sections.sketches.card.desc"),
        },
      },
      CHALLENGES: {
        TITLE: translate("cases.ewa-cool.sections.tech.title"),
        DESC: translate("cases.ewa-cool.sections.tech.desc"),
        CARD: {
          TITLE: translate("cases.ewa-cool.sections.tech.card.title"),
          DESC: translate("cases.ewa-cool.sections.tech.card.desc"),
        },
      },
      MOBILE: {
        CARD: {
          TITLE: translate("cases.ewa-cool.sections.mobile.card.title"),
          DESC: translate("cases.ewa-cool.sections.mobile.card.desc"),
        },
      },
    },
  };

  return (
    <Fragment>
      <SectionWrapper>
        <ArticleHeader title={COPY.TITLE} />
        <section className={clsx(globals.mainSection)}>
          <Text
            variant="article-body"
            dangerouslySetInnerHTML={{ __html: COPY.INTRO }}
          />
          <Separator />
          {Array.isArray(COPY.BODY) &&
            COPY.BODY.map((item: string) => (
              <Text
                variant="article-body"
                key={item}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
        </section>
      </SectionWrapper>

      <SectionHeader
        title={COPY.SECTIONS.SKETCHES.TITLE}
        className={clsx(globals.sectionTitle, "container")}
      />

      <SectionWrapper
        small
        style={{ backgroundImage: `url(${sketches})` }}
        className={globals.caseSection}
        contentClassName={globals.caseSectionContent}
      >
        <Box
          small
          title={COPY.SECTIONS.SKETCHES.CARD.TITLE}
          className={clsx(globals.card, globals.right)}
        >
          {Array.isArray(COPY.SECTIONS.SKETCHES.CARD.DESC) &&
            COPY.SECTIONS.SKETCHES.CARD.DESC.map((item: string) => (
              <Text key={item} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
        </Box>
      </SectionWrapper>
    </Fragment>
  );
}
