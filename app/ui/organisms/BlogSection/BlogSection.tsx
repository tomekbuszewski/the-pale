import { Sections } from "@nav";
import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";
import clsx from "clsx";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import type { HTMLProps } from "react";

import { Pagination } from "./BlogSection.helpers";

import styles from "./BlogSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  items: BlogPost[];
  pagination: PaginationProps;
  title?: string;
}

function BlogSection({ className, items, pagination, title }: Props) {
  return (
    <SectionWrapper
      id={Sections.videos}
      title={title}
      contentClassName={styles.wrapper}
      className={clsx(className, styles.parent)}
      columns={{ sm: 1, md: 3, lg: 3 }}
    >
      {items.map((item) => (
        <Box {...item} key={item.title} noBottomMargin>
          <Text>{item.children}</Text>
        </Box>
      ))}

      <Pagination {...pagination} />
    </SectionWrapper>
  );
}

export default BlogSection;
