import { SectionWrapper } from "@ui/atoms";
import { ArticleHeader } from "@ui/molecules";

import type { Meta } from "@common-types/Meta";
import type { HTMLProps } from "react";

import "@fontsource/tinos";

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  meta: Meta;
  body: string;
  youtube?: string;
}

import styles from "./BlogPost.module.scss";

function BlogPost({ body, title, meta, youtube, ...props }: Props) {
  return (
    <SectionWrapper>
      <article {...props} className={styles.wrapper}>
        <ArticleHeader title={title} meta={meta} />

        {youtube && (
          <iframe
            className={styles.youtube}
            src={`https://www.youtube.com/embed/${youtube}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        <div
          dangerouslySetInnerHTML={{ __html: body }}
          className={styles.content}
        />
      </article>
    </SectionWrapper>
  );
}

export default BlogPost;
