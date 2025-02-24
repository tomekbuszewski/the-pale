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
    index("pages/home.tsx"),
    route(Routes.website, "pages/services/web-development/index.tsx"),
    route(Routes.frontend, "pages/services/front-end/index.tsx"),
    route(Routes.consulting, "pages/services/consulting/index.tsx"),
    route(Routes.uses, "pages/uses.tsx"),
    route(Routes.tech, "pages/tech.tsx"),
    // route("/services", "routes/services/index.tsx"),
    route(Routes.post, "pages/blog/post.tsx"),
    route(Routes.pagination, "pages/blog/pagination.tsx"),

    ...prefix("/pl", [index("pages/pl/home.tsx")]),
  ]),
] satisfies RouteConfig;
