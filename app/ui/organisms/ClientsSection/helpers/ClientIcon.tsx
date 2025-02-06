import clsx from "clsx";

import type { Client } from "@common-types/Client";
import type { CSSProperties } from "react";

import styles from "../ClientsSection.module.scss";

export function ClientIcon({
  name,
  color,
  component: Component,
  count,
}: Client & { count: number }) {
  return (
    <figure
      key={name}
      className={styles.item}
      data-count={count + 1}
      style={{
        ["--color" as keyof CSSProperties]: color,
        ["--shadow" as keyof CSSProperties]: `${color.replace(")", "")}-shadow)`,
      }}
    >
      <Component />
      <figcaption className={clsx(styles.itemName, "sr-only")}>
        Logotype of my client {name}
      </figcaption>
    </figure>
  );
}
