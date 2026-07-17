import { createFileRoute } from "@tanstack/react-router";
import { container, title, content } from "./docs.style";

export const Route = createFileRoute("/docs")({ 
  component: Docs,
  head: () => ({
    meta: [
      { title: "Documentation | MorphCSS" },
      { name: "description", content: "Learn how to use MorphCSS, the zero-runtime atomic CSS compiler. Read the documentation, explore the APIs, and understand the syntax." }
    ]
  })
});

function Docs() {
  return (
    <div className={container.className}>
      <h1 className={title.className}>Documentation</h1>
      <div className={content.className}>
        <p>
          MorphCSS is a rust-powered atomic CSS compiler with zero runtime and an intuitive object syntax DX.
        </p>
        <h2>Installation</h2>
        <p>Installation is simple across all major frameworks.</p>
        <h2>Core APIs</h2>
        <ul>
          <li>
            <strong>Static Styles:</strong> Wrap your styles in <code>css({"{ ... }"})</code>. This is evaluated at build time and replaced with atomic classes.
          </li>
          <li>
            <strong>Dynamic Styles:</strong> Use a function signature <code>(args) =&gt; css({"{ ... }"})</code>. MorphCSS automatically binds the arguments to CSS variables.
          </li>
          <li>
            <strong>Combining Styles:</strong> Use the <code>cx()</code> function to combine multiple classes together conditionally.
          </li>
        </ul>
        <h2>Usage Recommendation</h2>
        <p>
          You can apply generated styles in two ways. We highly recommend spreading the styles so that both class names and dynamic CSS variables are passed correctly:
        </p>
        <ul>
          <li>
            <strong>Recommended:</strong> <code>&lt;div {"{...classes}"}&gt;</code>
          </li>
          <li>
            <strong>Alternative:</strong> <code>&lt;div className={"{"}classes.className{"}"}&gt;</code> (Note: If using dynamic styles, you must manually pass <code>style={"{"}classes.style{"}"}</code>)
          </li>
        </ul>
      </div>
    </div>
  );
}
