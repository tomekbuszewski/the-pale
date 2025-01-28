import {
  type ElementType,
  type HTMLProps,
  type RefObject,
  useMemo,
  useRef,
} from "react";
import { SectionWrapper, Text } from "@ui/atoms";
import { useScroll } from "motion/react";

import { makeTextIntoSpans, Span } from "./AboutSection.helpers";

import styles from "./AboutSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  children: string;
}

function AboutSection({ children }: Props) {
  const formattedText = useMemo(() => makeTextIntoSpans(children), [children]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start -40%"],
  });

  return (
    <SectionWrapper
      ref={containerRef as unknown as RefObject<ElementType>}
      contentClassName={styles.container}
      title="About"
    >
      <div className={styles.wrapper}>
        <Text variant="about" bold className={styles.text}>
          {formattedText?.map((child, index) => {
            return (
              <Span
                progress={scrollYProgress}
                index={index}
                total={formattedText.length}
                key={index}
              >
                {child}
              </Span>
            );
          })}
        </Text>
      </div>
    </SectionWrapper>
  );
}

export default AboutSection;
