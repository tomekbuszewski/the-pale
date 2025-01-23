import clsx from "clsx";

import type { HTMLProps } from "react";

import styles from "./BouncingArrow.module.scss";

function BouncingArrow({ className }: HTMLProps<HTMLDivElement>) {
  const classNames = [styles.wrapper, className];

  return (
    <div className={clsx(classNames)}>
      <div className={styles.container}>
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </div>
  );
}

export default BouncingArrow;
