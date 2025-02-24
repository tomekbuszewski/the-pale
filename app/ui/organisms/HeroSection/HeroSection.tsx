import { Sections } from "@nav";
import { BouncingArrow, Button, SectionWrapper, Text } from "@ui/atoms";
import { LayoutGroup, useScroll, useTransform } from "motion/react";

import type { HTMLProps } from "react";

import styles from "./HeroSection.module.scss";
import { useTranslate } from "@hooks";

interface Props extends HTMLProps<HTMLDivElement> {
  copy: string;
  title?: string;
}

function HeroSection({ children, copy, title }: Props) {
  const translate = useTranslate();
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
      title={title}
      id={Sections.hero}
      className={styles.wrapper}
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <meta itemProp="role" content="heading" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={copy} />

      <LayoutGroup>
        <Text variant="hero" className={styles.heading}>
          {children}
        </Text>
      </LayoutGroup>

      <Text className={styles.copy}>{copy}</Text>

      <div className={styles.buttonWrapper}>
        <Button to="#contact" variant="primary">
          {translate("hero.section.contact")}
        </Button>
        <Button to="#works" variant="tertiary">
          {translate("hero.section.explore")}
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
