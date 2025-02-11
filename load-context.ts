import type { IncomingRequestCfProperties } from "@cloudflare/workers-types";
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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {}
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return context;
}
