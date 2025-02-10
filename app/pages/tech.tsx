import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, List } from "@ui/molecules";
import { translate } from "@utils/translate";
import clsx from "clsx";

import globals from "./pages.module.scss";

const COPY = {
  INTRO: translate("tech.intro") as string,
  BODY: translate("tech.body") as string[],

  SECTIONS: [
    {
      TITLE: translate("tech.languages.title") as string,
      ITEMS: ["JavaScript", "TypeScript", "CSS", "Python", "Go", "Java"],
      DESCRIPTION: translate("tech.languages.desc") as string,
    },
    {
      TITLE: translate("tech.libs.title") as string,
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
      DESCRIPTION: translate("tech.libs.desc") as string,
    },
    {
      TITLE: translate("tech.testing.title") as string,
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
      DESCRIPTION: translate("tech.testing.desc") as string,
    },
  ],
};

export default function Consulting() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title={translate("tech.title") as string} />

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
