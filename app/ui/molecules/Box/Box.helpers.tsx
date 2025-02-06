import { Button, Text } from "@ui/atoms";

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
      {icon ? icon : null}
    </>
  );
}

interface FooterProps {
  onClick?: () => void;
  youtube?: string;
  link: string;
  active?: boolean;
  readMoreLabel?: string;
}

export function Footer({
  onClick,
  youtube,
  link,
  active,
  readMoreLabel = "Read more",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      {youtube ? (
        <>
          <Button to={link} variant="primary">
            Read
          </Button>
          <Button to={youtube} variant="tertiary" target="_blank">
            Watch ↗
          </Button>
        </>
      ) : (
        <Button to={link} variant="primary">
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
