import { Sections } from "@nav";
import { BouncingArrow, Button, SectionWrapper, Text } from "@ui/atoms";
import { LayoutGroup, useScroll, useTransform } from "motion/react";

import type { HTMLProps } from "react";

import styles from "./HeroSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  copy: string;
}

function HeroSection({ children, copy }: Props) {
  const { scrollY } = useScroll();
  const halfWindowHeight =
    typeof window !== "undefined" ? window.innerHeight / 2 : 1;

  const arrowOpacity = useTransform(
    scrollY,
    [0, halfWindowHeight / 2],
    [1, 0],
    {
      clamp: true,
    },
  );

  const arrowY = useTransform(scrollY, [0, halfWindowHeight], [0, -112], {
    clamp: false,
  });

  return (
    <SectionWrapper
      title="Hello"
      id={Sections.hero}
      animate={false}
      className={styles.wrapper}
    >
      <LayoutGroup>
        <Text variant="hero" className={styles.heading}>
          {children}
        </Text>
      </LayoutGroup>

      <Text className={styles.copy}>{copy}</Text>

      <div className={styles.buttonWrapper}>
        <Button to="#contact" variant="primary">
          Contact
        </Button>
        <Button to="#works" variant="secondary">
          Explore
        </Button>
      </div>

      <BouncingArrow
        className={styles.arrow}
        style={{ opacity: arrowOpacity, y: arrowY }}
      />
    </SectionWrapper>
  );
}

export default HeroSection;
