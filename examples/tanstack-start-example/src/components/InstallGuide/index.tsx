import { container, title, subtitle, grid, card, cardTitle, pre, token, keyword, string } from "./style";

export function InstallGuide() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Install MorphCSS</h2>
      <p className={subtitle.className}>
        Ready for production. Works seamlessly with your favorite modern frameworks.
      </p>

      <div className={grid.className}>
        <div className={card.className}>
          <div className={cardTitle.className}>React & TanStack Start</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>import</span> <span className={string.className}>"@morph-css/kit/css"</span>;
              <br />
              <span className={token.className}>{"// It just works. Zero config."}</span>
            </code>
          </pre>
        </div>

        <div className={card.className}>
          <div className={cardTitle.className}>Vite</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>import</span> {"{ "}defineConfig{" }"} <span className={keyword.className}>from</span> <span className={string.className}>"vite"</span>;
              <br />
              <span className={keyword.className}>import</span> morphcss <span className={keyword.className}>from</span> <span className={string.className}>"@morph-css/vite"</span>;
              <br /><br />
              <span className={keyword.className}>export default</span> defineConfig({"{"}
              <br />  plugins: [morphcss()]
              <br />{"}"});
            </code>
          </pre>
        </div>

        <div className={card.className}>
          <div className={cardTitle.className}>Next.js</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>import</span> morphcss <span className={keyword.className}>from</span> <span className={string.className}>"@morph-css/next"</span>;
              <br /><br />
              <span className={keyword.className}>const</span> nextConfig = {"{"}
              <br />  experimental: {"{"}
              <br />    swcPlugins: [morphcss()]
              <br />  {"}"}
              <br />{"}"};
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
