import { createFileRoute } from "@tanstack/react-router";
import { container, title, content } from "./installation.style";

export const Route = createFileRoute("/installation")({
  component: Installation,
  head: () => ({
    meta: [
      { title: "Installation | MorphCSS" },
      { name: "description", content: "Install MorphCSS in your React, Next.js, or Vite applications in seconds. Framework-agnostic and easy to configure." }
    ]
  })
});

function Installation() {
  return (
    <div className={container.className}>
      <h1 className={title.className}>Installation</h1>
      <div className={content.className}>
        <p>
          Getting started with MorphCSS is simple. MorphCSS is framework-agnostic and works with any modern bundler.
        </p>
        
        <h2>1. Import Core CSS</h2>
        <p>At the very root of your application (e.g. <code>src/main.tsx</code> or <code>app/layout.tsx</code>), import the MorphCSS core styles:</p>
        <pre>
          <code>import "@morph-css/kit/css";</code>
        </pre>

        <h2>2. Configure your Bundler</h2>
        
        <h3>Vite / TanStack Start</h3>
        <p>In your <code>vite.config.ts</code>, import and add the MorphCSS plugin:</p>
        <pre>
          <code>{`import { defineConfig } from "vite";
import { morphcss } from "@morph-css/kit/vite";

export default defineConfig({
  plugins: [morphcss()],
});`}</code>
        </pre>

        <h3>Next.js</h3>
        <p>In your <code>next.config.ts</code>, wrap your configuration with MorphCSS:</p>
        <pre>
          <code>{`import { withMorphCSS } from "@morph-css/kit/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withMorphCSS(nextConfig);`}</code>
        </pre>
      </div>
    </div>
  );
}
