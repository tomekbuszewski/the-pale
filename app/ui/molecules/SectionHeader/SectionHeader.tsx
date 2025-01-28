import { Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./SectionHeader.module.scss";

interface Props extends HTMLMotionProps<"header"> {
  title: string;
  animate?: boolean;
}

function SectionHeader({ title, className, animate = true, ...rest }: Props) {
  if (animate) {
    Object.assign(rest, createMotionConfig(0));
  }

  return (
    <motion.header className={clsx(styles.title, className)} {...rest}>
      <Text variant="section-heading">{title}</Text>
      <hr className={styles.separator} />
    </motion.header>
  );
}

export default SectionHeader;
