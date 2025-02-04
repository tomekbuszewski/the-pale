import type { HTMLProps } from "react";

import Icon from "./assets/separator.svg?react";

import styles from "./Separator.module.scss";

function Separator(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={styles.separator}>
      <Icon />
    </div>
  );
}

export default Separator;
