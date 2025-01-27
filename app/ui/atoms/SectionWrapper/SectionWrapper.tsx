import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { ElementType, HTMLProps } from "react";

import styles from "./SectionWrapper.module.scss";

interface Props<T extends ElementType = "section"> extends HTMLProps<T> {
  title?: string;
  tag?: ElementType;
  breakout?: "left" | "right";
  contentClassName?: string;
}

function SectionWrapper<T extends ElementType = "section">({
  title,
  children,
  className,
  contentClassName,
  breakout,
  tag: Tag = "section",
  ...rest
}: Props<T>) {
  const classNames = [styles.wrapper, className];
  const contentClassNames = [styles.content, contentClassName];

  if (breakout) {
    contentClassNames.push(styles.breakout, styles[breakout]);
  }

  return (
    <Tag {...rest} className={clsx(classNames)}>
      <div className={clsx(contentClassNames)}>
        {title && (
          <header className={styles.title}>
            <Text variant="section-heading">{title}</Text>
            <hr className={styles.separator} />
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}

export default SectionWrapper;
