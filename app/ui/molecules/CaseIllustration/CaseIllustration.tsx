import { type HTMLProps } from "react";
import clsx from "clsx";

import { SectionWrapper, Text } from "@ui/atoms";
import { Box, SectionHeader } from "@ui/molecules";

import styles from "./CaseIllustration.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  subtitle: string;
  description: string[];
  background: string;
}

function isBackgroundColor(color: string) {
  return color.startsWith("#") && (color.length === 4 || color.length === 7);
}

function CaseIllustration({
  title,
  description,
  subtitle,
  background,
  className,
}: Props) {
  const wrapperStyle = isBackgroundColor(background)
    ? { backgroundColor: background }
    : { backgroundImage: `url(${background})` };

  return (
    <section className={clsx(styles.wrapper, className)}>
      <SectionHeader title={title} className="container" />

      <SectionWrapper
        small
        className={styles.mainContent}
        contentClassName={styles.innerContent}
        style={wrapperStyle}
      >
        <Box small title={subtitle} className={styles.card}>
          {description.map((item) => (
            <Text key={item} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </Box>
      </SectionWrapper>
    </section>
  );
}

export default CaseIllustration;
