import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { BlogPost } from "@common-types/Blogpost";
import type { Service } from "@common-types/Service";
import type { HTMLProps, ReactNode } from "react";

import { Footer, Meta, Tags } from "./Box.helpers";

import styles from "./Box.module.scss";

interface NoLink {
  hidden?: boolean;
  date?: never;
  tags?: never;
  youtube?: never;
  link?: string;
  active?: boolean;
  children: ReactNode;
  icon?: never;
  title?: string;
  onClick?: () => void;
  readMoreLabel?: string;
}

type Props = HTMLProps<HTMLDivElement> &
  (BlogPost | Service | NoLink) & {
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
  readMoreLabel,
}: Props) {
  const classNames = [className, styles.wrapper];

  return (
    <article
      data-disabled={typeof link === "undefined"}
      data-active={active}
      className={clsx(classNames, {
        [styles.hidden]: hidden,
        [styles.active]: active,
      })}
    >
      <Meta date={date} icon={icon} />

      <Text
        variant="title"
        dangerouslySetInnerHTML={{ __html: title ?? "" }}
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

      {link && (
        <Footer
          readMoreLabel={readMoreLabel}
          link={link}
          youtube={youtube}
          onClick={onClick}
          active={active}
        />
      )}
    </article>
  );
}

export default Box;
