import { BlogSection as Main } from "@ui/organisms";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import { Content } from "@features";
import { useContext } from "react";

export default function BlogSection({
  items,
  pagination,
}: {
  items: BlogPost[];
  pagination: PaginationProps;
}) {
  const translate = Content.hooks.useTranslate();
  const currentLanguage = useContext(Content.context);

  if (currentLanguage !== "en") return null;

  return (
    <Main
      title={translate("blog.feature.title")}
      items={items}
      pagination={pagination}
    />
  );
}
