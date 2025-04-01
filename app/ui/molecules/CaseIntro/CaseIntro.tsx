import type { HTMLProps } from "react";

import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader } from "@ui/molecules";

import styles from "./CaseIntro.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  lead: string;
  description: string[];
}

function CaseIntro({ title, lead, description, className }: Props) {
  return (
    <SectionWrapper className={className}>
      <ArticleHeader title={title} backButton={false} />

      <div className={styles.intro}>
        <Text
          variant="article-body"
          dangerouslySetInnerHTML={{ __html: lead }}
        />

        <Separator />

        {description.map((item) => (
          <Text
            key={item}
            dangerouslySetInnerHTML={{ __html: item }}
            variant="article-body"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default CaseIntro;
