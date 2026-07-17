import { container, title, subtitle, grid, panel, panelTitle, pre, token, keyword, string, property, tag, variable, number, htmlText } from "./style";

export function GeneratedOutput() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Zero-Runtime Output</h2>
      <p className={subtitle.className}>
        MorphCSS compiles your styling into optimal, deduplicated CSS classes and static HTML. 
        Zero JavaScript overhead in the browser.
      </p>

      <div className={grid.className}>
        <div className={panel.className}>
          <div className={panelTitle.className}>Input: React Component</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>const</span> <span className={variable.className}>button</span> = (<span className={variable.className}>dynamicColor</span>: <span className={keyword.className}>string</span>) =&gt; <span className={variable.className}>css</span>({"{ "}
              <br />  <span className={property.className}>padding</span>: <span className={number.className}>12</span>,
              <br />  <span className={property.className}>color</span>: <span className={variable.className}>dynamicColor</span>,
              <br />  <span className={property.className}>borderRadius</span>: <span className={number.className}>8</span>
              <br />{"}"});
              <br />
              <br /><span className={keyword.className}>export function</span> <span className={variable.className}>App</span>() {"{"}
              <br />  <span className={keyword.className}>return</span> <span className={tag.className}>&lt;button</span> {"{"}<span className={keyword.className}>...</span><span className={variable.className}>button</span>(<span className={string.className}>"#6366f1"</span>){"}"}<span className={tag.className}>&gt;</span>
              <br />    <span className={htmlText.className}>Click Me</span>
              <br />  <span className={tag.className}>&lt;/button&gt;</span>;
              <br />{"}"}
            </code>
          </pre>
        </div>

        <div className={panel.className}>
          <div className={panelTitle.className}>Generated CSS</div>
          <pre className={pre.className}>
            <code>
              <span className={token.className}>.a1</span> {"{"} <span className={property.className}>padding</span>: <span className={number.className}>12px</span>; {"}"}
              <br />
              <span className={token.className}>.b2</span> {"{"} <span className={property.className}>border-radius</span>: <span className={number.className}>8px</span>; {"}"}
              <br />
              <span className={token.className}>.c3</span> {"{"} <span className={property.className}>color</span>: <span className={variable.className}>var</span>(<span className={string.className}>--0</span>); {"}"}
            </code>
          </pre>
        </div>

        <div className={panel.className}>
          <div className={panelTitle.className}>Compiled HTML</div>
          <pre className={pre.className}>
            <code>
              <span className={tag.className}>&lt;button</span> 
              <br />  <span className={property.className}>class</span>=<span className={string.className}>"a1 b2 c3"</span> 
              <br />  <span className={property.className}>style</span>=<span className={string.className}>"--0:#6366f1"</span>
              <br /><span className={tag.className}>&gt;</span>
              <br />  <span className={htmlText.className}>Click Me</span>
              <br /><span className={tag.className}>&lt;/button&gt;</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
