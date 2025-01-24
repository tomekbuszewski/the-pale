import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { HTMLProps, ReactNode } from "react";

import { Footer, Meta, Tags } from "./Box.helpers";

import styles from "./Box.module.scss";

interface BlogPost {
  title: string;
  date: Date;
  tags: string[];
  youtube: string;
  link: string;
  icon?: never;
  onClick?: never;
}

interface Service {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  hidden?: boolean;
  date?: never;
  tags?: never;
  youtube?: never;
  link?: never;
}

type Props = HTMLProps<HTMLDivElement> & (BlogPost | Service);

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
  ...rest
}: Props) {
  const classNames = [className, styles.wrapper];

  return (
    <article
      {...rest}
      className={clsx(classNames, {
        [styles.hidden]: hidden,
      })}
    >
      <Meta date={date} icon={icon} />

      <Text
        variant="title"
        dangerouslySetInnerHTML={{ __html: title }}
        className={styles.title}
      />

      <section className={styles.body}>{children}</section>

      <Tags tags={tags} />

      <Footer link={link} youtube={youtube} onClick={onClick} />
    </article>
  );
}

export default Box;
