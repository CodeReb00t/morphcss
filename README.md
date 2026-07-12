# MorphCSS

<p align="center">
  <strong>Zero-runtime atomic CSS-in-JS powered by Rust.</strong>
</p>

<p align="center">
  <a href="https://github.com/morphcss/morphcss/actions"><img src="https://img.shields.io/github/actions/workflow/status/morphcss/morphcss/ci.yml?branch=master" alt="Build Status"></a>
  <a href="https://npmjs.com/package/morphcss"><img src="https://img.shields.io/npm/v/morphcss.svg" alt="npm package"></a>
  <a href="https://github.com/morphcss/morphcss/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/morphcss.svg" alt="License"></a>
</p>

MorphCSS is a blazingly fast, highly concurrent Atomic CSS engine. It provides the ergonomics of Tailwind, the type-safety of PandaCSS, and the zero-runtime architecture of Vanilla Extract—all while keeping a high-performance Rust compiler as the single source of truth.

## Features

- ⚡️ **Blazingly Fast**: Built entirely in Rust using `oxc` and `lightningcss`.
- ⚛️ **Zero Runtime**: Extracts your static CSS at build-time. No style injection performance hits.
- 🎨 **Dynamic Variables**: Intelligently converts dynamic JS values into highly efficient CSS variables.
- ♻️ **Perfect Garbage Collection**: A hyper-accurate reference-counted cache ensures unused styles are removed instantly during HMR.
- 🔌 **Framework Agnostic**: Integrates beautifully with Vite, React, Vue, Next.js, and TanStack Start.
- 🧵 **Highly Concurrent**: Cross-thread caching means instant atomic hash generation without locking bottlenecks.

## Installation

```bash
npm install morphcss
npm install -D @morphcss/vite-plugin
```

## Quick Start (Vite + React)

Add the plugin to your `vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import morphcss from "@morphcss/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    morphcss({
      utilities: "./src/tailwind.css", // Optional: ingest Tailwind-like utilities
      output: "morph.css",
    }),
  ],
});
```

Define your styles right inside your components:

```tsx
import { css } from "morphcss";

// 1. Fully static extraction
const buttonClass = css({
  display: "flex",
  padding: "16px",
  backgroundColor: "blue",
});

// 2. Dynamic variable extraction
const container = (color: string) =>
  css({
    borderColor: color,
    borderWidth: "1px",
    borderStyle: "solid",
  });

export default function App() {
  return (
    <div {...container("red")}>
      <button {...buttonClass}>Click me!</button>
    </div>
  );
}
```

## Documentation

Full documentation is available at [morphcss.dev](https://morphcss.dev).

## Contributing

We welcome all contributions! Please see our [Contributing Guide](CONTRIBUTING.md) to learn how to get started.

## License

MorphCSS is [MIT Licensed](LICENSE).
