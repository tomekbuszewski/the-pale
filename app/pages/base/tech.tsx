import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, List } from "@ui/molecules";
import clsx from "clsx";

import globals from "../pages.module.scss";
import { Content } from "@features";

export default function Consulting() {
  const translate = Content.hooks.useTranslate();
  const COPY = {
    INTRO: translate("tech.intro"),
    BODY: translate("tech.body"),

    SECTIONS: [
      {
        TITLE: translate("tech.languages.title"),
        ITEMS: ["JavaScript", "TypeScript", "CSS", "Python", "Go", "Java"],
        DESCRIPTION: translate("tech.languages.desc"),
      },
      {
        TITLE: translate("tech.libs.title"),
        ITEMS: [
          "React",
          "Next.js",
          "Astro",
          "Gatsby",
          "NestJS",
          "Express",
          "TsED",
          "Flask",
          "FastAPI",
          "Django",
          "WordPress",
          "Symfony 2",
          "Encore",
          "Spring Boot",
        ],
        DESCRIPTION: translate("tech.libs.desc"),
      },
      {
        TITLE: translate("tech.testing.title"),
        ITEMS: [
          "Vitest",
          "Jest",
          "Cypress",
          "Cucumber",
          "Playwright",
          "MSW",
          "Go Test Runner",
          "JUnit",
        ],
        DESCRIPTION: translate("tech.testing.desc"),
      },
    ],
  };

  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title={translate("tech.title")} />

      <section className={clsx(globals.mainSection)}>
        <Text variant="article-body">{COPY.INTRO}</Text>
        <Separator />
        {COPY.BODY.map((item, index) => (
          <Text key={index} variant="article-body">
            {item}
          </Text>
        ))}
      </section>

      <section className={clsx(globals.mainSection, globals.full)}>
        {COPY.SECTIONS.map(({ TITLE, DESCRIPTION, ITEMS }) => (
          <List
            key={TITLE}
            columns={2}
            title={TITLE}
            items={ITEMS}
            description={DESCRIPTION}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
