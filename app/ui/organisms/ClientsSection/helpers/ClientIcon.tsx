import clsx from "clsx";
import { motion } from "motion/react";
import slugify from "slugify";

import type { CSSProperties } from "react";

import type { Client } from "../ClientsSection.types";

import { itemVariants } from "./random";
import { useMouseBackground } from "./useMouseBackground";

import styles from "../ClientsSection.module.scss";

export function ClientIcon({
  name,
  color,
  component: Component,
  count,
}: Client & { count: number }) {
  const { style, ...hovering } = useMouseBackground(
    `var(--gradient-${slugify(name, { lower: true, remove: /\./g })})`,
    "66%",
  );

  return (
    <motion.figure
      key={name}
      className={styles.item}
      data-count={count + 1}
      style={{ ["--color" as keyof CSSProperties]: color }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, delay: 0.1 * count }}
      variants={itemVariants}
      {...hovering}
    >
      <motion.div style={style} className={styles.bg} />
      <Component />
      <figcaption className={clsx(styles.itemName, "sr-only")}>
        Logotype of my client {name}
      </figcaption>
    </motion.figure>
  );
}
