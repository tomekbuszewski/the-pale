import { index, layout, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./ui/layouts/Main.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
