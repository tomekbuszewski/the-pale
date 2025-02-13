import { Button, Text } from "@ui/atoms";

import type { Href } from "@common-types/Href";
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
  links: Href[];
  onClick?: () => void;
}

export function Footer({ links }: FooterProps) {
  return (
    <footer className={styles.footer}>
      {links.map((link) => (
        <Button
          to={link.href}
          variant={link.variant}
          key={link.href}
          aria-label={link.title}
          target={link.external ? "_blank" : undefined}
        >
          {link.label}
        </Button>
      ))}
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
