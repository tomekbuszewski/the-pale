import type { LargeCard as Props } from "@common-types/LargeCard";
import clsx from "clsx";
import { motion } from "motion/react";

import { Button, Text } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";

import styles from "./LargeCard.module.scss";

function LargeCard({
  title,
  more,
  description,
  body,
  className,
  align = "left",
  contentCentered = false,
  ...props
}: Props) {
  return (
    <motion.section
      {...props}
      className={clsx(styles.wrapper, className, "cardWrapper", styles[align], {
        [styles.centered]: contentCentered,
      })}
    >
      <div
        className={clsx(styles.desc, {
          [styles.centered]: contentCentered,
        })}
      >
        <SectionHeader
          title={title}
          animate={false}
          margin="none"
          className={styles.header}
        />

        {Array.isArray(description)
          ? description.map((item) => <Text key={item}>{item}</Text>)
          : description}

        {more && (
          <footer className={styles.footer}>
            <Button to={more.href} variant="primary">
              {more.label}
            </Button>
          </footer>
        )}
      </div>
      <div
        className={clsx(styles.body, {
          [styles.centered]: contentCentered,
        })}
      >
        {body}
      </div>
    </motion.section>
  );
}

export default LargeCard;
