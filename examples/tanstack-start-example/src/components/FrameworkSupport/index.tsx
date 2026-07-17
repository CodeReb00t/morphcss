import { card, container, grid, name, title } from "./style";

const FRAMEWORKS = [
  "React",
  "TanStack Start",
  "Next.js",
  "Vite",
  "Remix",
  "Astro",
  "Solid",
  "Svelte",
];

export function FrameworkSupport() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Framework Support</h2>
      <div className={grid.className}>
        {FRAMEWORKS.map((fw, i) => (
          <div key={i} className={card.className}>
            <div className={name.className}>{fw}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
