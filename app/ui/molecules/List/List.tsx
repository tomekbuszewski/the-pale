import clsx from "clsx";

import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  items: string[];
}

import { Text } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";

import styles from "./List.module.scss";

function List({ title, items, className, ...props }: Props) {
  return (
    <section
      role="region"
      title={title}
      {...props}
      className={clsx(className, styles.wrapper)}
    >
      <SectionHeader title={title} className={styles.title} animate={false} />

      <ul className={styles.list}>
        {items.map((item) => (
          <Text variant="list" key={item}>
            {item}
          </Text>
        ))}
      </ul>
    </section>
  );
}

export default List;
