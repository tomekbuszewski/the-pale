import type { HTMLProps, MouseEvent } from "react";
import type { Meta as MetaProps } from "@common-types/Meta";
import { Content } from "@features";

import { Button, Text } from "@ui/atoms";

import styles from "./ArticleHeader.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  meta?: MetaProps;
  backButton?: boolean;
}

function Meta({ date, tags }: MetaProps) {
  const translate = Content.hooks.useTranslate();

  return (
    <aside className={styles.meta}>
      <Text variant="highlight" tag="p">
        {translate("article.header.meta.posted-on")}{" "}
        <time dateTime={date.toDateString()}>
          {date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </Text>
      <Text variant="highlight" tag="p">
        {tags.join(" · ")}
      </Text>
    </aside>
  );
}

function ArticleHeader({ title, meta, backButton = true, ...props }: Props) {
  const translate = Content.hooks.useTranslate();

  function handleBack(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.history.back();
  }

  return (
    <header {...props} className={styles.wrapper}>
      {backButton ? (
        <Button to="#" variant="tertiary" onClick={handleBack}>
          {translate("article.header.meta.back")}
        </Button>
      ) : null}

      <Text
        variant="hero"
        bold
        dangerouslySetInnerHTML={{ __html: title }}
        className={styles.title}
      />
      {meta && <Meta {...meta} />}
    </header>
  );
}

export default ArticleHeader;
