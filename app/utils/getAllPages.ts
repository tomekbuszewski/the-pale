import loader from "../features/BlogSection/loader.server";
import { StaticRoutes } from "../nav";

export default async function getAllPages() {
  const posts = await loader({ withContent: false });
  const pagination = await loader({ withContent: false, limit: 6 });
  const items: string[] = Object.values(StaticRoutes);

  if (posts.items) {
    for (const { link } of posts.items) {
      if (Array.isArray(link)) {
        for (const { href } of link) {
          if (!href.includes("http")) {
            items.push(href);
          }
        }
      } else {
        items.push(link.href);
      }
    }
  }

  if (pagination.pagination?.pages) {
    for (const page of pagination.pagination.pages) {
      items.push(`/writings/page/${page}`);
    }
  }

  return ["/", ...items];
}
