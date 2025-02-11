// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { PlatformProxy } from "wrangler";

interface GetLoadContextArgs {
  request: Request;
  context: {
    cloudflare: Omit<
      PlatformProxy<Env, IncomingRequestCfProperties>,
      "dispose" | "caches"
    > & {
      caches:
        | PlatformProxy<Env, IncomingRequestCfProperties>["caches"]
        | CacheStorage;
    };
  };
}

declare module "react-router" {
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return context;
}
