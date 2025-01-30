import { Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./SectionHeader.module.scss";

interface Props extends HTMLMotionProps<"header"> {
  title: string;
  animate?: boolean;
  dark?: boolean;
}

function SectionHeader({
  title,
  className,
  animate = true,
  dark,
  ...rest
}: Props) {
  if (animate) {
    Object.assign(rest, createMotionConfig(0));
  }

  return (
    <motion.header
      className={clsx(styles.title, className, {
        [styles.dark]: dark,
      })}
      {...rest}
    >
      <Text variant="section-heading">{title}</Text>
      <hr className={styles.separator} />
    </motion.header>
  );
}

export default SectionHeader;
