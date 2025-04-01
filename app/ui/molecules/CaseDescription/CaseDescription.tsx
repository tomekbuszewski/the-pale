import type { HTMLProps } from "react";
import clsx from "clsx";

import { SectionWrapper, Text } from "@ui/atoms";
import { List } from "@ui/molecules";

import styles from "./CaseDescription.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  description: string[];
  card?: {
    title: string;
    description: string[];
  };
}

function CaseDescription({ title, description, card, className }: Props) {
  return (
    <SectionWrapper className={clsx(className)} title={title}>
      <div className={styles.content}>
        {description.map((item) => (
          <Text
            key={item}
            dangerouslySetInnerHTML={{ __html: item }}
            variant="article-body"
          />
        ))}
      </div>

      {card && (
        <List
          className={styles.card}
          title={card.title}
          items={card.description}
        />
      )}
    </SectionWrapper>
  );
}

export default CaseDescription;
