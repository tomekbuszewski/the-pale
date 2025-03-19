import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
  type RouteConfigEntry,
} from "@react-router/dev/routes";

import { Routes } from "./nav";

const baseRoutes = [
  index("pages/%prefix%/home.tsx"),
  route(Routes.website, "pages/%prefix%/services/web-development/index.tsx"),
  route(Routes.frontend, "pages/%prefix%/services/front-end/index.tsx"),
  route(Routes.consulting, "pages/%prefix%/services/consulting/index.tsx"),
  route(Routes.uses, "pages/%prefix%/uses.tsx"),
  route(Routes.tech, "pages/%prefix%/tech.tsx"),

  route(Routes.works, "pages/%prefix%/works/index.tsx"),
];

function generatePrefixedRoutes(routes: RouteConfigEntry[], prefix: string) {
  return routes.map((route) => ({
    ...route,
    file: route.file.replace("%prefix%", prefix),
  }));
}

export default [
  layout("./layouts/Main.tsx", [
    /* English routes */
    ...generatePrefixedRoutes(baseRoutes, "en"),
    route(Routes.post, "pages/blog/post.tsx"),
    route(Routes.pagination, "pages/blog/pagination.tsx"),

    /* Polish routes */
    ...prefix("/pl", [...generatePrefixedRoutes(baseRoutes, "pl")]),
  ]),
] satisfies RouteConfig;
