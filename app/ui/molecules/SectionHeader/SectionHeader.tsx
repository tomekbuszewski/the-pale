import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { HTMLProps } from "react";

import styles from "./SectionHeader.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
}

function SectionHeader({ title, className }: Props) {
  return (
    <header className={clsx(styles.title, className)}>
      <Text variant="section-heading">{title}</Text>
      <hr className={styles.separator} />
    </header>
  );
}

export default SectionHeader;
