import type { CSSProperties, ElementType, HTMLProps } from "react";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { motion } from "motion/react";

import { SectionHeader } from "@ui/molecules";

import styles from "./SectionWrapper.module.scss";

interface ColumnConfig {
  sm?: number;
  md?: number;
  lg?: number;
}

interface Props<T extends ElementType = "section"> extends HTMLProps<T> {
  title?: string;
  tag?: ElementType;
  breakout?: "left" | "right";
  contentClassName?: string;
  animate?: boolean;
  animateOnlyHeader?: boolean;
  dark?: boolean;
  columns?: ColumnConfig;
  small?: boolean;
}

function SectionWrapper<T extends ElementType = "section">({
  title,
  children,
  className,
  contentClassName,
  breakout,
  tag: Tag = "section",
  animate = true,
  animateOnlyHeader = false,
  dark = false,
  small,
  columns,
  ...rest
}: Props<T>) {
  const classNames = [
    styles.wrapper,
    className,
    small ? styles.small : styles.large,
  ];
  const contentClassNames = [styles.content, contentClassName];
  const motionConfig =
    animate && !animateOnlyHeader ? createMotionConfig(3) : {};

  const smColumn = columns?.sm ?? 12;
  const mdColumn = columns?.md ?? 12;
  const lgColumn = columns?.lg ?? 12;

  const style = {
    ["--columns-sm" as keyof CSSProperties]: smColumn,
    ["--columns-md" as keyof CSSProperties]: mdColumn,
    ["--columns-lg" as keyof CSSProperties]: lgColumn,
  };

  if (breakout) {
    contentClassNames.push(styles.breakout, styles[breakout]);
  }

  return (
    <Tag {...rest} className={clsx(classNames, { [styles.dark]: dark })}>
      {title && (
        <SectionHeader
          dark={dark}
          title={title}
          className={styles.header}
          animate={animate}
        />
      )}
      <motion.div
        className={clsx(contentClassNames)}
        {...motionConfig}
        style={style}
      >
        {children}
      </motion.div>
    </Tag>
  );
}

export default SectionWrapper;
