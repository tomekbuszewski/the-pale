import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, List } from "@ui/molecules";
import clsx from "clsx";

import globals from "../pages.module.scss";
import { Content } from "@features";

export default function Consulting() {
  const translate = Content.hooks.useTranslate();
  const COPY = {
    INTRO: translate("uses.copy"),

    SECTIONS: [
      {
        TITLE: translate("uses.section.hardware.title"),
        DESCRIPTION: translate("uses.section.hardware.desc"),
        ITEMS: translate("uses.section.hardware.items"),
      },
      {
        TITLE: translate("uses.section.software.title"),
        DESCRIPTION: translate("uses.section.software.desc"),
        ITEMS: translate("uses.section.software.items"),
      },
      {
        TITLE: translate("uses.section.music.title"),
        DESCRIPTION: translate("uses.section.music.desc"),
        ITEMS: translate("uses.section.music.items"),
      },
      {
        TITLE: translate("uses.section.gaming.title"),
        DESCRIPTION: translate("uses.section.gaming.desc"),
        ITEMS: translate("uses.section.gaming.items"),
      },
    ],
  };

  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Uses" />

      <section className={clsx(globals.mainSection)}>
        <Text
          variant="article-body"
          dangerouslySetInnerHTML={{ __html: COPY.INTRO }}
        />
        <Separator />
      </section>

      <section className={clsx(globals.mainSection, globals.full)}>
        {COPY.SECTIONS.map(({ TITLE, DESCRIPTION, ITEMS }) => (
          <List
            key={TITLE}
            columns={1}
            description={DESCRIPTION}
            title={TITLE}
            items={ITEMS}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
