import { container, title, subtitle, grid, codeBlockWrapper, codeTitle, pre, comment, keyword, string, property, tag, variable } from "./style";

export function CodeExamples() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Intuitive APIs</h2>
      <p className={subtitle.className}>
        MorphCSS supports multiple authoring styles to fit your workflow, from quick prototyping to scalable design systems.
      </p>

      <div className={grid.className}>
        <div className={codeBlockWrapper.className}>
          <div className={codeTitle.className}>Object Spread Syntax</div>
          <pre className={pre.className}>
            <code>
              <span className={tag.className}>&lt;div</span> <span className={keyword.className}>...</span><span className={variable.className}>css</span>({"{ "}
              <br />  <span className={property.className}>display</span>: <span className={string.className}>"flex"</span>,
              <br />  <span className={property.className}>gap</span>: <span className={string.className}>"16px"</span>
              <br />{"}"})<span className={tag.className}>&gt;</span>
              <br />  <span className={comment.className}>{"// Best for layouts & prototyping"}</span>
              <br /><span className={tag.className}>&lt;/div&gt;</span>
            </code>
          </pre>
        </div>

        <div className={codeBlockWrapper.className}>
          <div className={codeTitle.className}>className API</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>const</span> <span className={variable.className}>button</span> = <span className={variable.className}>css</span>({"{ "}...{" }"});
              <br /><br />
              <span className={tag.className}>&lt;div</span> className={"{"}<span className={variable.className}>button</span>.<span className={property.className}>className</span>{"}"}<span className={tag.className}>&gt;</span>
              <br />  <span className={comment.className}>{"// Best for shared & reusable styles"}</span>
              <br /><span className={tag.className}>&lt;/div&gt;</span>
            </code>
          </pre>
        </div>

        <div className={codeBlockWrapper.className}>
          <div className={codeTitle.className}>Dynamic Style API</div>
          <pre className={pre.className}>
            <code>
              <span className={keyword.className}>const</span> <span className={variable.className}>button</span> = (<span className={variable.className}>color</span>: <span className={keyword.className}>string</span>) =&gt; <span className={variable.className}>css</span>({"{ "}
              <br />  <span className={property.className}>color</span>: <span className={variable.className}>color</span>,
              <br />  <span className={property.className}>padding</span>: <span className={string.className}>"12px"</span>,
              <br />  <span className={string.className}>"&:hover"</span>: {"{"}
              <br />    <span className={property.className}>opacity</span>: <span className={string.className}>0.8</span>
              <br />  {"}"}
              <br />{"}"});
              <br />
              <br /><span className={comment.className}>{"// Dynamic functions with nested selectors"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
