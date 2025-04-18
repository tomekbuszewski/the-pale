import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

import getPages from "./app/utils/getAllPages";

export default {
  presets: [vercelPreset()],
  ssr: true,
  prerender: getPages,
} satisfies Config;
