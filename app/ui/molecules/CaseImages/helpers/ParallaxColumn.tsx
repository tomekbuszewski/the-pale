import type { RefObject } from "react";
import { useIsMobile } from "@hooks";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";

import type { Props } from "../CaseImages.types";

import styles from "../CaseImages.module.scss";

interface ParallaxColumnProps {
  columnIndex: number;
  columnImages: string[];
  mode: Props["mode"];
  project?: string;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function ParallaxColumn({
  columnIndex,
  columnImages,
  mode,
  project,
  containerRef,
}: ParallaxColumnProps) {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end center"],
  });

  const threshold = 512;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? [0, 0]
      : columnIndex % 2 === 0
        ? [0, threshold * -1]
        : [0, threshold],
  );

  return (
    <motion.div className={styles.column} style={{ y }}>
      {columnImages.map((image, imageIndex) => (
        <figure
          key={`${columnIndex}-${imageIndex}`}
          className={clsx(styles.imageWrapper, styles[mode])}
        >
          <img
            src={image}
            alt={`Case study image for ${project ?? ""}`}
            className={styles.image}
          />
          {project && (
            <figcaption>
              <i />
              <i />
              <i />
              <span>{project}</span>
            </figcaption>
          )}
        </figure>
      ))}
    </motion.div>
  );
}
