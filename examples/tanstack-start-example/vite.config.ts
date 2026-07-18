import { devtools } from "@tanstack/devtools-vite";
import { defineConfig } from "vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

import { morphcss } from "@morph-css/kit/vite";
import viteReact from "@vitejs/plugin-react";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), morphcss(), tanstackStart(), nitro(), viteReact()],
});

export default config;
