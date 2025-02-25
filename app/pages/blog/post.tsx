import { useLayoutEffect } from "react";
import { useLoaderData, useLocation } from "react-router";
import blogLoader from "@features/BlogSection/loader";
import { Routes } from "@nav";
import { BlogPost } from "@ui/organisms";
import title from "@utils/title";

import type { Route } from "../../../.react-router/types/app/pages/blog/+types/post";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: title(data.title) }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const content = await blogLoader({ withContent: true });

  if (content?.items) {
    const post = content.items.find((item) => {
      if (Array.isArray(item.link)) {
        return item.link.some(
          (link) => link.href === Routes.post.replace(":slug", slug),
        );
      }

      return item.link.href === Routes.post.replace(":slug", slug);
    });

    if (post) {
      return post;
    }

    throw new Response("Not found", { status: 404 });
  }

  throw new Response("Not found", { status: 404 });
}

function extractYouTubeID(link: string): string | undefined {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = regex.exec(link);
  return match ? match[1] : undefined;
}

export default function Post() {
  const location = useLocation();
  const data = useLoaderData<typeof loader>();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  if (data.cnt) {
    return (
      <BlogPost
        youtube={extractYouTubeID(data.youtube)}
        title={data.title}
        meta={{ date: data.date, tags: data.tags }}
        body={data.cnt}
      />
    );
  }
}
