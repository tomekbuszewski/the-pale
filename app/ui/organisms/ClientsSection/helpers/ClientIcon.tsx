import clsx from "clsx";
import { motion } from "motion/react";

import type { Client } from "@common-types/Client";
import type { CSSProperties } from "react";

import { itemVariants } from "./random";

import styles from "../ClientsSection.module.scss";

export function ClientIcon({
  name,
  color,
  component: Component,
  count,
}: Client & { count: number }) {
  return (
    <motion.figure
      key={name}
      className={styles.item}
      data-count={count + 1}
      style={{
        ["--color" as keyof CSSProperties]: color,
        ["--shadow" as keyof CSSProperties]: `${color.replace(")", "")}-shadow)`,
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, delay: 0.1 * count }}
      variants={itemVariants}
    >
      <Component />
      <figcaption className={clsx(styles.itemName, "sr-only")}>
        Logotype of my client {name}
      </figcaption>
    </motion.figure>
  );
}
