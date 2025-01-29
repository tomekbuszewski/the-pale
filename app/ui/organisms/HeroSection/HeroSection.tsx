import {
  BouncingArrow,
  Button,
  SectionWrapper,
  Text,
  TextRotate,
} from "@ui/atoms";
import { LayoutGroup, useScroll, useTransform } from "motion/react";

import type { HTMLProps } from "react";

import styles from "./HeroSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  keywords: string[];
  copy: string;
}

function HeroSection({ keywords, copy }: Props) {
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
    <SectionWrapper title="Hello" animate={false} className={styles.wrapper}>
      <LayoutGroup>
        <Text variant="hero" className={styles.heading}>
          Need&nbsp;a&nbsp;
          <TextRotate
            staggerFrom="last"
            texts={keywords}
            rotationInterval={5000}
            mainClassName={styles.wordWrapper}
          />
          <br />
          for&nbsp;your&nbsp;business?
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
