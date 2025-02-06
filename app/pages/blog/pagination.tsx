import { useLoaderData } from "react-router";
import { BlogSection } from "@features";
import blogLoader from "@features/BlogSection/loader.server";

import type { BlogPost } from "@common-types/Blogpost";

import type { Route } from "../../../.react-router/types/app/pages/blog/+types/pagination";

export async function loader({ params }: Route.LoaderArgs) {
  const content = await blogLoader({
    withContent: false,
    page: Number(params.page),
    limit: 6,
  });

  if (content.items?.length === 0) {
    throw new Response("Not found", { status: 404 });
  }

  return content;
}

export default function Pagination() {
  const data = useLoaderData<typeof loader>();

  if (data.pagination && data.items) {
    return (
      <BlogSection.component
        pagination={data.pagination}
        items={data.items as BlogPost[]}
      />
    );
  }

  return null;
}
