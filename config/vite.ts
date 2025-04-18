import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import compression from "vite-plugin-compression";
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

  build: {
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        format: "esm",
        manualChunks: (id: string) => {
          if (id.includes(".json")) {
            return "content";
          }

          if (id.includes("shiki")) {
            return "shiki";
          }

          if (id.includes("motion")) {
            return "motion";
          }

          if (id.includes("legacy")) {
            return "legacy";
          }

          return null;
        },
      },
    },
    target: "es2015",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },

  plugins: [
    { enforce: "pre", ...mdx() },
    tsconfigPaths(),
    svgr(),
    imagetools({
      defaultDirectives: new URLSearchParams({ quality: "90", format: "webp" }),
    }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    compression({ algorithm: "gzip", ext: ".gz" }),
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
