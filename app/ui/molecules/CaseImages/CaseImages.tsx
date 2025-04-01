import { type CSSProperties, useRef } from "react";
import clsx from "clsx";

import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";

import type { Props } from "./CaseImages.types";
import { distributeImages } from "./helpers/distributeImages";
import { getColumnCount } from "./helpers/getColumnCount";
import { ParallaxColumn } from "./helpers/ParallaxColumn";

import styles from "./CaseImages.module.scss";

function CaseImages({
  mode,
  project,
  images,
  title,
  description,
  className,
  background,
}: Props) {
  const columns = getColumnCount(mode);
  const distributedImages = distributeImages(images, mode);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper
      className={clsx(className, styles.wrapper)}
      contentClassName={styles.content}
      breakout="right"
      style={{ background }}
    >
      <Box small title={title} className={styles.card}>
        {description.map((item) => (
          <Text key={item} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </Box>

      <div
        className={styles.columns}
        style={{ ["--columns" as keyof CSSProperties]: columns }}
        ref={containerRef}
      >
        {distributedImages.map((columnImages, columnIndex) => (
          <ParallaxColumn
            key={columnIndex}
            columnIndex={columnIndex}
            columnImages={columnImages}
            mode={mode}
            project={project}
            containerRef={containerRef}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default CaseImages;
