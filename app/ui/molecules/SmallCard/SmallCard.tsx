import { Text } from "@ui/atoms";

import type { HTMLProps } from "react";

interface Props extends HTMLMotionProps<"article"> {
  title: string;
  no: string | number;
  body: string;
}

import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./SmallCard.module.scss";

function SmallCard({ title, body, no, className, ...props }: Props) {
  return (
    <motion.article
      {...props}
      className={clsx(styles.wrapper, className, "cardWrapper")}
    >
      <Text
        variant="title"
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Text className={styles.body}>{body}</Text>
      <span className={styles.number}>{no}</span>
    </motion.article>
  );
}

export default SmallCard;
