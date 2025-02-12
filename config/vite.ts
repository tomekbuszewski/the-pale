import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export const baseConfig = defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    { enforce: "pre", ...mdx() },
    tsconfigPaths(),
    svgr(),
    imagetools({
      defaultDirectives: new URLSearchParams({ quality: "90", format: "webp" }),
    }),
  ],

  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./config/test.setup.ts"],
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});

export const routerConfig = defineConfig(({ command }) => ({
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: process.env.NODE_ENV === "test" ? [] : [reactRouter()],
}));

export default baseConfig;
