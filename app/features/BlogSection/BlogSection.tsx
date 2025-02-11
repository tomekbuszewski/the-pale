import { BlogSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";

export default function BlogSection({
  items,
  pagination,
}: {
  items: BlogPost[];
  pagination: PaginationProps;
}) {
  return (
    <Main
      title={translate("blog.feature.title")}
      items={items}
      pagination={pagination}
    />
  );
}
