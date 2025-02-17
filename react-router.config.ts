import { vercelPreset } from "@vercel/react-router/vite";

import type { Config } from "@react-router/dev/config";

import getPages from "./app/utils/getAllPages";

export default {
  presets: [vercelPreset()],
  ssr: true,
  prerender: getPages,
} satisfies Config;
