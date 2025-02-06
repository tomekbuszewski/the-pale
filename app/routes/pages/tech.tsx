import { Link } from "react-router";
import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, List } from "@ui/molecules";
import clsx from "clsx";

import globals from "../services/service.module.scss";

const COPY = {
  INTRO:
    "Throughout the years I’ve worked with tons and tons of different tech.",
  BODY: "I feel comfortable with almost any (roughly modern) stack. I’ve worked with tons of variations, including PHP, Node, JavaScript and TypeScript, Python, Java and Go.",
  BODY2:
    "If you’re looking for a (more or less) comprehensive list, here it is:",

  SECTIONS: [
    {
      TITLE: "Languages",
      ITEMS: ["JavaScript", "TypeScript", "CSS", "Python", "Go", "Java"],
      DESCRIPTION:
        "These are the languages I have commercial experience with. Besides these, I've dabbled with Ruby, Rust and tons of others.",
    },
    {
      TITLE: "Frameworks and Important Libraries",
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
      DESCRIPTION:
        "A list of frameworks and libraries I have the most experience with. By no means exhaustive.",
    },
    {
      TITLE: "Testing",
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
      DESCRIPTION:
        "These are the testing tools I have built at least one commercial app with.",
    },
  ],
};

export default function Consulting() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Uses" />

      <section className={clsx(globals.mainSection)}>
        <Text variant="article-body">{COPY.INTRO}</Text>
        <Separator />
        <Text variant="article-body">{COPY.BODY}</Text>
        <Text variant="article-body">{COPY.BODY2}</Text>
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
