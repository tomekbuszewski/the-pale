import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader } from "@ui/molecules";

import globals from "../service.module.scss";

export default function Consulting() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Project &&nbsp;Development Consulting" />

      <section className={globals.mainSection}>
        <Text variant="article-body">Hello</Text>

        <Separator />
      </section>
    </SectionWrapper>
  );
}
