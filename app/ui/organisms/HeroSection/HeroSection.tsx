import {
  BouncingArrow,
  Button,
  SectionWrapper,
  Text,
  TextRotate,
} from "@ui/atoms";
import { LayoutGroup } from "motion/react";

import type { HTMLProps } from "react";

import styles from "./HeroSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  keywords: string[];
  copy: string;
}

function HeroSection({ keywords }: Props) {
  return (
    <SectionWrapper title="Hello">
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

      <Text className={styles.copy}>
        Say goodbye to website headaches. Enjoy seamless, worry-free solutions
        so you can focus on growing your product and business.
      </Text>

      <div className={styles.buttonWrapper}>
        <Button to="#contact" variant="primary">
          Contact
        </Button>
        <Button to="#works" variant="secondary">
          Explore
        </Button>
      </div>

      <BouncingArrow className={styles.arrow} />
    </SectionWrapper>
  );
}

export default HeroSection;
