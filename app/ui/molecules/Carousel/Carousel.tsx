import type { CSSProperties, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  icons: [string, string][];
  columns: number;
  width?: string;
  icon?: string;
  large?: boolean;
}

import clsx from "clsx";

import styles from "./Carousel.module.scss";

function Carousel({
  icons,
  columns,
  width = "16rem",
  icon = "8rem",
  large,
}: Props) {
  const itemsPerColumn = Math.ceil(icons.length / columns);
  const rows = Array.from({ length: columns }, (_, colIndex) => {
    const start = colIndex * itemsPerColumn;
    return icons.slice(start, start + itemsPerColumn);
  });

  return (
    <div
      className={clsx(styles.wrapper, { [styles.large]: large })}
      style={{
        ["--columns" as keyof CSSProperties]: columns,
        ["--width" as keyof CSSProperties]: width,
        ["--icon" as keyof CSSProperties]: icon,
        ["--ratio" as keyof CSSProperties]: width === icon ? "auto" : "1/1",
        ["--count" as keyof CSSProperties]: itemsPerColumn,
      }}
    >
      {rows.map((row, i) => (
        <section key={i}>
          {row.map(([src, alt], j) => (
            <i
              key={j}
              className={styles.icon}
              style={{ ["--number" as keyof CSSProperties]: j }}
            >
              <img alt={`Icon of ${alt}`} src={src} />
            </i>
          ))}
        </section>
      ))}
    </div>
  );
}

export default Carousel;
