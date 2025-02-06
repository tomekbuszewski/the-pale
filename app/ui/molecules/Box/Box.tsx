import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { BlogPost } from "@common-types/Blogpost";
import type { Service } from "@common-types/Service";
import type { HTMLProps } from "react";

import { Footer, Meta, Tags } from "./Box.helpers";

import styles from "./Box.module.scss";

type Props = HTMLProps<HTMLDivElement> &
  (BlogPost | Service) & {
    noBottomMargin?: boolean;
  };

function Box({
  title,
  date,
  tags,
  youtube,
  link,
  icon,
  onClick,
  hidden,
  className,
  children,
  active,
  noBottomMargin,
}: Props) {
  const classNames = [className, styles.wrapper];

  return (
    <article
      data-active={active}
      className={clsx(classNames, {
        [styles.hidden]: hidden,
        [styles.active]: active,
      })}
    >
      <Meta date={date} icon={icon} />

      <Text
        variant="title"
        dangerouslySetInnerHTML={{ __html: title }}
        className={styles.title}
      />

      <section
        className={clsx(styles.body, {
          [styles.noMargin]: noBottomMargin,
        })}
      >
        {children}
      </section>

      <Tags tags={tags} />

      <Footer link={link} youtube={youtube} onClick={onClick} active={active} />
    </article>
  );
}

export default Box;
