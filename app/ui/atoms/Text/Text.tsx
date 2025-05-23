import type { ElementType, HTMLProps } from "react";
import clsx from "clsx";

import styles from "./Text.module.scss";

interface Props<T extends ElementType> extends HTMLProps<T> {
  mono?: boolean;
  bold?: boolean;
  align?: "left" | "center" | "right";
  tag?: ElementType;
  color?:
    | "background"
    | "lead"
    | "accent"
    | "text"
    | "text-light"
    | "lead-light"
    | "minor";
  variant?:
    | "hero"
    | "regular"
    | "small"
    | "large"
    | "highlight"
    | "section-heading"
    | "title"
    | "title-small"
    | "button"
    | "list"
    | "about"
    | "h2"
    | "h3"
    | "h4"
    | "blockquote"
    | "article-body"
    | "ul"
    | "pre"
    | "code"
    | "work";
}

function Text<T extends ElementType = "p">({
  variant = "regular",
  className,
  bold,
  color,
  align,
  mono,
  tag,
  ...rest
}: Props<T>) {
  const classNames = [className, styles.text, styles[variant]];
  let Tag: ElementType = tag ?? "p";

  if (!tag) {
    switch (variant) {
      case "hero":
        Tag = "h1" as ElementType;
        break;
      case "small":
        Tag = "span" as ElementType;
        break;
      case "highlight":
        Tag = "span" as ElementType;
        break;
      case "section-heading":
        Tag = "h2" as ElementType;
        break;
      case "title":
        Tag = "h3" as ElementType;
        break;
      case "button":
        Tag = "span" as ElementType;
        break;
      case "list":
        Tag = "li" as ElementType;
        break;
      case "work":
        Tag = "h3" as ElementType;
        break;
      case "h2":
        Tag = "h2" as ElementType;
        break;
      case "h3":
        Tag = "h3" as ElementType;
        break;
      case "h4":
        Tag = "h4";
        break;
      case "ul":
        Tag = "ul" as ElementType;
        break;
      case "blockquote":
        Tag = "blockquote" as ElementType;
        break;
      case "pre":
        Tag = "pre" as ElementType;
        break;
      case "code":
        Tag = "code" as ElementType;
        break;
      case "regular":
      case "large":
      case "about":
      default:
        Tag = "p" as ElementType;
        break;
    }
  }

  if (bold) {
    classNames.push(styles.bold);
  }

  if (mono) {
    classNames.push(styles.mono);
  }

  if (color) {
    classNames.push(`text-${color}`);
  }

  if (align) {
    classNames.push(`align-${align}`);
  }

  return <Tag {...rest} className={clsx(classNames)} />;
}

export default Text;
