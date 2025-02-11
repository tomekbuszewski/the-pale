import { Button, SectionWrapper, Text } from "@ui/atoms";

import type { HTMLProps } from "react";

import styles from "./ErrorPage.module.scss";

function ErrorPage({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <SectionWrapper className={styles.parent} contentClassName={styles.wrapper}>
      <Text className={styles.error}>404</Text>
      <div>
        <Text variant="about" className={styles.msg}>
          There&#39;s always a siren singing you to shipwreck.
        </Text>
        <Text variant="about" className={styles.msg}>
          Steer away from these rocks
        </Text>

        <div className={styles.buttonWrapper}>
          <Button variant="primary" to="/">
            A walking disaster
          </Button>
          <Button
            target="_blank"
            variant="tertiary"
            className={styles.msg}
            to="https://www.youtube.com/watch?v=7AQSLozK7aA"
          >
            &#34;There there&#34; ↗
          </Button>
        </div>

        {children ? <pre>{children}</pre> : null}
      </div>
    </SectionWrapper>
  );
}

export default ErrorPage;
