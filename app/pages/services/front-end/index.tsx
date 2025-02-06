import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader } from "@ui/molecules";

import globals from "../../pages.module.scss";

const COPY = {
  INTRO:
    "You already have a design (or a designer) and want to get your site coded? Say no more — I can get it up and running with tech adjusted for your needs.",
};

export default function Frontend() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Front-end Development" />

      <section className={globals.mainSection}>
        <Text variant="article-body">{COPY.INTRO}</Text>

        <Separator />
      </section>
    </SectionWrapper>
  );
}
