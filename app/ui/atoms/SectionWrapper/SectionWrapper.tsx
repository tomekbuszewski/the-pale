import { SectionHeader } from "@ui/molecules";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { motion } from "motion/react";

import type { ElementType, HTMLProps } from "react";

import styles from "./SectionWrapper.module.scss";

interface Props<T extends ElementType = "section"> extends HTMLProps<T> {
  title?: string;
  tag?: ElementType;
  breakout?: "left" | "right";
  contentClassName?: string;
  animate?: boolean;
}

function SectionWrapper<T extends ElementType = "section">({
  title,
  children,
  className,
  contentClassName,
  breakout,
  tag: Tag = "section",
  animate = true,
  ...rest
}: Props<T>) {
  const classNames = [styles.wrapper, className];
  const contentClassNames = [styles.content, contentClassName];
  const motionConfig = animate ? createMotionConfig(3) : {};

  if (breakout) {
    contentClassNames.push(styles.breakout, styles[breakout]);
  }

  return (
    <Tag {...rest} className={clsx(classNames)}>
      {title && (
        <SectionHeader
          title={title}
          className={styles.header}
          animate={animate}
        />
      )}
      <motion.div className={clsx(contentClassNames)} {...motionConfig}>
        {children}
      </motion.div>
    </Tag>
  );
}

export default SectionWrapper;
