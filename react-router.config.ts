import type { Config } from "@react-router/dev/config";

import loader from "./app/features/BlogSection/loader";
import { StaticRoutes } from "./app/nav";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  prerender: async () => {
    const posts = await loader({ withContent: false });
    const items: string[] = Object.values(StaticRoutes);

    if (posts.items) {
      for (const item of posts.items) {
        items.push(item.link);
      }
    }

    return ["/", ...items];
  },
} satisfies Config;
