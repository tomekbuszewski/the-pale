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
    // route("/services", "routes/services/index.tsx"),
    route("/writings/:slug", "routes/blog/post.tsx"),
  ]),
] satisfies RouteConfig;
