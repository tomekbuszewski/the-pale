import { defineConfig, mergeConfig } from "vite";

import { baseConfig, routerConfig } from "./config/vite";

export default defineConfig((env) =>
  mergeConfig(baseConfig, routerConfig(env)),
);
