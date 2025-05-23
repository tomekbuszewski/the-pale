import { Fragment, type HTMLProps, useRef } from "react";
import type { Work } from "@common-types/Work";
import { Content } from "@features";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";
import { motion, useInView } from "motion/react";

import { Button, SectionWrapper, Text } from "@ui/atoms";

import { Image } from "./helpers/Image";
import { Tags } from "./helpers/Tags";

import styles from "./WorkItem.module.scss";

interface Props extends HTMLProps<HTMLDivElement>, Omit<Work, "title"> {
  index: number;
}

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
  date,
  index,
}: Props) {
  const translate = Content.hooks.useTranslate();
  const classNames = [className, styles.parent];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.1,
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
      title={translate("work.title")}
      breakout={align}
      contentClassName={clsx(styles.work, {
        [styles.left]: align === "left",
      })}
      tag="article"
      animate={false}
      style={style}
      dark
      itemScope
      itemType="https://schema.org/CreativeWork"
      itemProp="hasPart"
    >
      <section className={styles.details}>
        <meta itemProp="name" content={title} />
        <meta itemProp="dateCreated" content={date.toISOString()} />
        <meta itemProp="position" content={String(index + 1)} />

        <motion.div {...createMotionConfig(0)}>
          <Text variant="title" className={styles.title}>
            {title}
          </Text>
        </motion.div>

        {description && (
          <motion.div {...createMotionConfig(1)}>
            <Text className={styles.description}>
              {Array.isArray(description) ? (
                description.map((text, i) => (
                  <Fragment key={i}>{translate(text)}</Fragment>
                ))
              ) : (
                <Fragment>{translate(description)}</Fragment>
              )}
            </Text>
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

      {(study ?? link) ? (
        <motion.footer className={styles.footer} {...createMotionConfig(4)}>
          {study ? (
            <Button variant="primary" to={study ?? ""} disabled={!study}>
              {study
                ? translate("work.item.study.ok")
                : translate("work.item.study.na")}
            </Button>
          ) : null}

          {link ? (
            <Button to={link ?? ""} variant="secondary" disabled={!link}>
              {link
                ? translate("work.item.online.ok")
                : translate("work.item.online.na")}
            </Button>
          ) : null}
        </motion.footer>
      ) : null}
    </SectionWrapper>
  );
}

export default WorkItem;
