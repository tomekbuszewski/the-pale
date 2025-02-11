import { createRequestHandler, type ServerBuild } from "react-router";

import type {
  EventContext,
  IncomingRequestCfProperties,
} from "@cloudflare/workers-types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as build from "./build/server";
import { getLoadContext } from "./load-context";

const requestHandler = createRequestHandler(build as unknown as ServerBuild);

export default {
  async fetch(
    request: Request & { cf: IncomingRequestCfProperties },
    env: Env,
    ctx: EventContext<string, string, undefined>,
  ) {
    try {
      const loadContext = getLoadContext({
        request,
        context: {
          cloudflare: {
            cf: request.cf,
            ctx: {
              waitUntil: ctx.waitUntil.bind(ctx),
              passThroughOnException: ctx.passThroughOnException.bind(ctx),
            },
            caches,
            env,
          },
        },
      });
      return await requestHandler(request, loadContext);
    } catch (error) {
      console.log(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
};
