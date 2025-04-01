import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
  type RouteConfigEntry,
} from "@react-router/dev/routes";

import { Routes } from "./nav";

const works = ["ewa-cool"];

function generateWorksRoutes(
  items: string[],
  prefix: string,
): RouteConfigEntry[] {
  return items.map((work) => route(work, `pages/${prefix}/works/${work}.tsx`));
}

console.log(generateWorksRoutes(works, "en"));

const baseRoutes = [
  index("pages/%prefix%/home.tsx"),
  route(Routes.website, "pages/%prefix%/services/web-development/index.tsx"),
  route(Routes.frontend, "pages/%prefix%/services/front-end/index.tsx"),
  route(Routes.consulting, "pages/%prefix%/services/consulting/index.tsx"),
  route(Routes.uses, "pages/%prefix%/uses.tsx"),
  route(Routes.tech, "pages/%prefix%/tech.tsx"),
];

function generatePrefixedRoutes(routes: RouteConfigEntry[], prefix: string) {
  return routes.map((route) => {
    return {
      ...route,
      file: route.file.replace("%prefix%", prefix),
    };
  });
}

export default [
  layout("./layouts/Main.tsx", [
    /* English routes */
    ...generatePrefixedRoutes(baseRoutes, "en"),
    route(Routes.post, "pages/blog/post.tsx"),
    route(Routes.pagination, "pages/blog/pagination.tsx"),

    route(Routes.works.replace(":slug", ""), "pages/base/works/index.tsx", [
      ...generateWorksRoutes(works, "en"),
    ]),

    /* Polish routes */
    ...prefix("/pl", [...generatePrefixedRoutes(baseRoutes, "pl")]),
  ]),
] satisfies RouteConfig;
