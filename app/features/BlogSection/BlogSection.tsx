import { BlogSection as Main } from "@ui/organisms";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import { Content } from "@features";

export default function BlogSection({
  items,
  pagination,
}: {
  items: BlogPost[];
  pagination: PaginationProps;
}) {
  const translate = Content.hooks.useTranslate();

  return (
    <Main
      title={translate("blog.feature.title")}
      items={items}
      pagination={pagination}
    />
  );
}
