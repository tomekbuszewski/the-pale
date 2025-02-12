import { Button, Text } from "@ui/atoms";
import { translate } from "@utils/translate";

import type { ReactNode } from "react";

import CalendarIcon from "./assets/calendar.svg?react";

import styles from "./Box.module.scss";

interface MetaProps {
  icon?: ReactNode;
  date?: Date;
}

export function Meta({ icon, date }: MetaProps) {
  return (
    <>
      {date ? (
        <time dateTime={date.toDateString()} className={styles.date}>
          <CalendarIcon />
          <Text variant="highlight">{date.toDateString()}</Text>
        </time>
      ) : null}
      {icon ?? null}
    </>
  );
}

interface FooterProps {
  onClick?: () => void;
  youtube?: string;
  link: string;
  active?: boolean;
  readMoreLabel?: string;
  title: string;
}

export function Footer({
  onClick,
  youtube,
  link,
  active,
  title,
  readMoreLabel = "Read more",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      {youtube ? (
        <>
          <Button
            to={link}
            variant="primary"
            aria-label={translate("blog.section.read-more", title)}
          >
            {translate("blog.section.buttons.read-more")}
          </Button>
          <Button to={youtube} variant="tertiary" target="_blank">
            {translate("blog.section.buttons.watch")} ↗
          </Button>
        </>
      ) : (
        <Button
          to={link}
          variant="primary"
          aria-label={translate("services.section.read-more", title)}
        >
          {readMoreLabel}
        </Button>
      )}

      {onClick ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          variant="tertiary"
          to="#services"
        >
          {active ? "Collapse" : "Expand"}
        </Button>
      ) : null}
    </footer>
  );
}

interface TagsProps {
  tags?: string[];
}

export function Tags({ tags }: TagsProps) {
  if (tags) {
    return (
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            <Text variant="highlight">{tag}</Text>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
