import type { Config } from "@react-router/dev/config";

import loader from "./app/features/BlogSection/loader.server";
import { StaticRoutes } from "./app/nav";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: async () => {
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
  },
} satisfies Config;
