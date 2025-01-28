import type { HTMLProps } from "react";

import styles from "./MainWrapper.module.scss";

function MainWrapper(props: HTMLProps<HTMLDivElement>) {
  return <main className={styles.wrapper} {...props} />;
}

export default MainWrapper;
