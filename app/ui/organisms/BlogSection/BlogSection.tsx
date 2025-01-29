import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import type { HTMLProps } from "react";

import { Pagination } from "./BlogSection.helpers";

import styles from "./BlogSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  items: BlogPost[];
  pagination: PaginationProps;
}

function BlogSection({ className, items, pagination }: Props) {
  return (
    <SectionWrapper
      title="Videos & Writings"
      contentClassName={styles.wrapper}
      className={className}
    >
      {items.map((item) => (
        <Box {...item} key={item.title}>
          <Text>{item.children}</Text>
        </Box>
      ))}

      <Pagination {...pagination} />
    </SectionWrapper>
  );
}

export default BlogSection;
