import { useLoaderData } from "react-router";
import blogLoader from "@features/BlogSection/loader.server";

import type { Route } from "../../../.react-router/types/app/routes/blog/+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const content = await blogLoader({ withContent: true });

  if (content?.items) {
    const post = content.items.find(
      (item) => item.link.replace("/writings/", "") === slug,
    );

    if (post) {
      return post;
    }

    throw new Response("Not found", { status: 404 });
  }

  throw new Response("Not found", { status: 404 });
}

export default function Post() {
  const data = useLoaderData<typeof loader>();

  if (data.cnt) {
    return <div dangerouslySetInnerHTML={{ __html: data.cnt }} />;
  }
}
