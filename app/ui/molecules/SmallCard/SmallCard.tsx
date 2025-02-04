import { Text } from "@ui/atoms";

import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  no: string | number;
  body: string;
}

import clsx from "clsx";

import styles from "./SmallCard.module.scss";

function SmallCard({ title, body, no, className, ...props }: Props) {
  return (
    <article {...props} className={clsx(styles.wrapper, className)}>
      <Text variant="title" className={styles.title}>
        {title}
      </Text>
      <Text className={styles.body}>{body}</Text>
      <span className={styles.number}>{no}</span>
    </article>
  );
}

export default SmallCard;
