import { type HTMLProps } from "react";
import { useIsMobile } from "@hooks";
import { Button, SectionWrapper, Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { motion } from "motion/react";

import type { Work } from "@common-types/Work";

import CodeIcon from "./assets/code.svg?react";
import ConsultationIcon from "./assets/consultations.svg?react";
import DesignIcon from "./assets/design.svg?react";

import styles from "./WorkItem.module.scss";

interface TagsProps {
  tags: string[];
}

function resolveIcon(tag: string) {
  switch (tag) {
    case "Design":
      return <DesignIcon />;
    case "Development":
      return <CodeIcon />;
    case "Consultations":
      return <ConsultationIcon />;

    default:
      throw new Error("Unknown tag");
  }
}

function Tags(props: TagsProps) {
  return (
    <motion.ul className={styles.tags} {...createMotionConfig(3)}>
      {props.tags.map((tag) => (
        <Text variant="list" key={tag} className={styles.tag}>
          {resolveIcon(tag)}
          {tag}
        </Text>
      ))}
    </motion.ul>
  );
}

interface Props extends HTMLProps<HTMLDivElement>, Omit<Work, "title"> {}

function WorkItem({
  className,
  description,
  title,
  tags,
  mobileImage,
  desktopImage,
  study,
  link,
  background,
  align = "right",
}: Props) {
  const isMobile = useIsMobile();
  const classNames = [className, styles.parent];

  const style = background
    ? {
        backgroundImage: `url(${background})`,
      }
    : {};

  return (
    <SectionWrapper
      className={clsx(classNames)}
      title="Works"
      breakout={align}
      contentClassName={clsx(styles.work, {
        [styles.left]: align === "left",
      })}
      tag="article"
      animate={false}
      style={style}
      dark
    >
      <section className={styles.details}>
        <motion.div {...createMotionConfig(0)}>
          <Text variant="title" className={styles.title}>
            {title}
          </Text>
        </motion.div>

        {description.length > 0 && (
          <motion.div {...createMotionConfig(1)}>
            <Text className={styles.description}>{description[0]}</Text>
          </motion.div>
        )}

        <Tags tags={tags} />
      </section>

      <motion.section className={styles.images} {...createMotionConfig(8)}>
        {isMobile ? (
          <figure className={clsx(styles.mobileWrapper, styles.imageWrapper)}>
            <img src={mobileImage} alt={title} />
          </figure>
        ) : (
          <figure className={clsx(styles.desktopWrapper, styles.imageWrapper)}>
            <img src={desktopImage} alt={title} />
          </figure>
        )}
      </motion.section>

      <motion.footer className={styles.footer} {...createMotionConfig(4)}>
        <Button variant="primary" to={study ?? ""} disabled={!study}>
          {study ? "Case study" : "Study n/a"}
        </Button>

        <Button to={link ?? ""} variant="secondary" disabled={!link}>
          {link ? "View online" : "Online n/a"}
        </Button>
      </motion.footer>
    </SectionWrapper>
  );
}

export default WorkItem;
