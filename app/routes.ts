import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/Main.tsx", [
    index("routes/home.tsx"),
    route(
      "/services/website-design-development",
      "routes/services/web-development/index.tsx",
    ),
    route("/services/consulting", "routes/services/consulting/index.tsx"),
    route("/services/front-end", "routes/services/front-end/index.tsx"),
    route("/uses", "routes/pages/uses.tsx"),
    route("/tech", "routes/pages/tech.tsx"),
    // route("/services", "routes/services/index.tsx"),
    route("/writings/:slug", "routes/blog/post.tsx"),
  ]),
] satisfies RouteConfig;
