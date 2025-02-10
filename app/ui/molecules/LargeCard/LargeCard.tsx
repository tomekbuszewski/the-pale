import { Button } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";
import clsx from "clsx";
import { motion } from "motion/react";

import type { LargeCard as Props } from "@common-types/LargeCard";

import styles from "./LargeCard.module.scss";

function LargeCard({
  title,
  more,
  description,
  body,
  className,
  align = "left",
  ...props
}: Props) {
  return (
    <motion.section
      {...props}
      className={clsx(styles.wrapper, className, "cardWrapper", styles[align])}
    >
      <div className={styles.desc}>
        <SectionHeader
          title={title}
          animate={false}
          margin="none"
          className={styles.header}
        />

        {description}

        {more && (
          <footer className={styles.footer}>
            <Button to={more.href} variant="primary">
              {more.label}
            </Button>
          </footer>
        )}
      </div>
      <div className={styles.body}>{body}</div>
    </motion.section>
  );
}

export default LargeCard;
