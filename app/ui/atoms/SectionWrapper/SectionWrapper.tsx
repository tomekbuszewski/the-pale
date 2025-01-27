import { SectionHeader } from "@ui/molecules";
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
        {title && <SectionHeader title={title} />}
        {children}
      </div>
    </Tag>
  );
}

export default SectionWrapper;
