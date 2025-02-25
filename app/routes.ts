import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

import { Routes } from "./nav";

export default [
  layout("./layouts/Main.tsx", [
    index("pages/en/home.tsx"),
    route(Routes.website, "pages/en/services/web-development/index.tsx"),
    route(Routes.frontend, "pages/en/services/front-end/index.tsx"),
    route(Routes.consulting, "pages/en/services/consulting/index.tsx"),
    route(Routes.uses, "pages/en/uses.tsx"),
    route(Routes.tech, "pages/en/tech.tsx"),

    route(Routes.post, "pages/blog/post.tsx"),
    route(Routes.pagination, "pages/blog/pagination.tsx"),

    ...prefix("/pl", [
      index("pages/pl/home.tsx"),
      route(Routes.website, "pages/pl/services/web-development/index.tsx"),
      route(Routes.frontend, "pages/pl/services/front-end/index.tsx"),
      route(Routes.consulting, "pages/pl/services/consulting/index.tsx"),
      route(Routes.uses, "pages/pl/uses.tsx"),
      route(Routes.tech, "pages/pl/tech.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
