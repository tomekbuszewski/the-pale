import { Button } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";
import clsx from "clsx";

import type { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  align?: "left" | "right";
  description: ReactNode;
  more?: {
    href: string;
    label: string;
  };
  body: ReactNode;
}

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
    <section
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
    </section>
  );
}

export default LargeCard;
