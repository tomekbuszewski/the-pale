import { type HTMLProps, useRef } from "react";
import { Button, SectionWrapper, Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { motion, useInView } from "motion/react";

import type { Work } from "@common-types/Work";

import { Tags } from "./helpers/Tags";

import styles from "./WorkItem.module.scss";

function Image({
  image,
  title,
}: {
  image: string | OutputMetadata;
  title: string;
}) {
  if (typeof image === "string") {
    return <img src={image} alt={title} />;
  }

  return (
    <img
      src={image.src}
      alt={title}
      width={image.width}
      height={image.height}
    />
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
  const classNames = [className, styles.parent];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    once: true,
  });

  const style =
    background && isInView
      ? {
          backgroundImage: `url(${background})`,
        }
      : {};

  return (
    <SectionWrapper
      ref={sectionRef}
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
        <figure className={clsx(styles.mobileWrapper, styles.imageWrapper)}>
          {isInView && <Image image={mobileImage} title={title ?? ""} />}
        </figure>
        <figure className={clsx(styles.desktopWrapper, styles.imageWrapper)}>
          {isInView && <Image image={desktopImage} title={title ?? ""} />}
        </figure>
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
