import { BlogSection as Main } from "@ui/organisms";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import { useTranslate } from "@hooks";

export default function BlogSection({
  items,
  pagination,
}: {
  items: BlogPost[];
  pagination: PaginationProps;
}) {
  const translate = useTranslate();

  return (
    <Main
      title={translate("blog.feature.title")}
      items={items}
      pagination={pagination}
    />
  );
}
