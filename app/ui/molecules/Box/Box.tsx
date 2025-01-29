import { Text } from "@ui/atoms";
import clsx from "clsx";

import type { BlogPost } from "@common-types/Blogpost";
import type { Service } from "@common-types/Service";
import type { HTMLProps } from "react";

import { Footer, Meta, Tags } from "./Box.helpers";

import styles from "./Box.module.scss";

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
  active,
  ...rest
}: Props) {
  const classNames = [className, styles.wrapper];

  return (
    <article
      {...rest}
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

      <section className={styles.body}>
        <Text color="text">{children}</Text>
      </section>

      <Tags tags={tags} />

      <Footer link={link} youtube={youtube} onClick={onClick} active={active} />
    </article>
  );
}

export default Box;
