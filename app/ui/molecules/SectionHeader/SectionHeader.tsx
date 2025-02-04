import { Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./SectionHeader.module.scss";

interface Props extends HTMLMotionProps<"header"> {
  title: string;
  animate?: boolean;
  dark?: boolean;
  level?: 2 | 3 | 4 | 5 | 6;
  margin?: "none" | "auto" | "small";
}

function SectionHeader({
  title,
  className,
  animate = true,
  dark,
  children,
  level,
  margin,
  ...rest
}: Props) {
  if (animate) {
    Object.assign(rest, createMotionConfig(0));
  }

  return (
    <motion.header
      className={clsx(
        styles.title,
        className,
        margin && styles[`margin-${margin}`],
        styles[`level-${level}`],
        {
          [styles.dark]: dark,
          [styles.withLevel]: Boolean(level),
        },
      )}
      {...rest}
    >
      <Text variant="section-heading">{title ?? children}</Text>
      <hr className={styles.separator} />
    </motion.header>
  );
}

export default SectionHeader;
