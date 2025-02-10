import clsx from "clsx";

import type { CSSProperties, HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  items: ReactNode[];
  description?: ReactNode;
  columns?: number;
}

import { Text } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";

import styles from "./List.module.scss";

function List({
  title,
  items,
  className,
  description,
  columns = 2,
  ...props
}: Props) {
  return (
    <section
      role="region"
      title={title}
      {...props}
      className={clsx(className, styles.wrapper, "cardWrapper")}
    >
      <div className={styles.desc}>
        <SectionHeader title={title} className={styles.title} animate={false} />
        <Text
          variant="large"
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </div>

      <ul
        className={styles.list}
        style={{ ["--columns" as keyof CSSProperties]: columns }}
      >
        {items.map((item, i) => (
          <Text
            variant="list"
            key={i}
            dangerouslySetInnerHTML={{ __html: item as string }}
          />
        ))}
      </ul>
    </section>
  );
}

export default List;
