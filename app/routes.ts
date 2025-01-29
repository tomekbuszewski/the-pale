import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./ui/layouts/Main.tsx", [
    index("routes/home.tsx"),
    route("/writings/:slug", "routes/blog/post.tsx"),
  ]),
] satisfies RouteConfig;
