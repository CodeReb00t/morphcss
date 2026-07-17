import {
  card,
  container,
  featureDesc,
  featureTitle,
  grid,
  title,
} from "./style";

const FEATURES = [
  {
    title: "Rust Compiler",
    desc: "Built from the ground up in Rust for maximum performance and memory safety.",
  },
  {
    title: "Zero Runtime",
    desc: "No JavaScript overhead in the browser. Styles are extracted and shipped as pure CSS.",
  },
  {
    title: "Atomic CSS",
    desc: "Generates optimal, deduplicated atomic classes for the smallest possible bundle sizes.",
  },
  {
    title: "Dynamic Variables",
    desc: "Seamlessly pass dynamic runtime values. MorphCSS automatically binds them to CSS variables.",
  },
  {
    title: "Incremental Compilation",
    desc: "Only compiles what changed. Retains intermediate ASTs in memory for sub-millisecond rebuilds.",
  },
  {
    title: "Framework Agnostic",
    desc: "Works with React, Next.js, TanStack Start, Vite, Solid, Svelte, and Astro out of the box.",
  },
  {
    title: "Microsecond Transforms",
    desc: "P50 transform times under 80μs means your CSS compiles faster than you can blink.",
  },
  {
    title: "HMR Reference Counting",
    desc: "Precise Hot Module Replacement. Injects and cleans up styles instantly during development.",
  },
  {
    title: "No SSR Mismatch",
    desc: "100% Server-Side Rendering compatible. Zero runtime means zero hydration mismatch issues.",
  },
  {
    title: "Parallel Compilation",
    desc: "Leverages multi-threading to compile your entire project simultaneously.",
  },
];

export function Features() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Engineered for Scale</h2>
      <div className={grid.className}>
        {FEATURES.map((feature, i) => (
          <div key={i} className={card.className}>
            <h3 className={featureTitle.className}>{feature.title}</h3>
            <p className={featureDesc.className}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
