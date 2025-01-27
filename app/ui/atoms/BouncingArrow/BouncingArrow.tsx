import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./BouncingArrow.module.scss";

function BouncingArrow({ className, ...rest }: HTMLMotionProps<"div">) {
  const classNames = [styles.wrapper, className];

  return (
    <motion.div className={clsx(classNames)} {...rest}>
      <div className={styles.container}>
        <span className={styles.line} />
        <span className={styles.line} />
      </div>
    </motion.div>
  );
}

export default BouncingArrow;
