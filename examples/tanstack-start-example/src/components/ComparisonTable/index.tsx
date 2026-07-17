import { container, title, tableWrapper, table, th, td, check, warn, cross, logoCell } from "./style";

export function ComparisonTable() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>How MorphCSS Compares</h2>
      <div className={tableWrapper.className}>
        <table className={table.className}>
          <thead>
            <tr>
              <th className={th.className}>Capability</th>
              <th className={th.className}>Tailwind</th>
              <th className={th.className}>UnoCSS</th>
              <th className={th.className}>Panda</th>
              <th className={th.className}>Vanilla Extract</th>
              <th className={th.className}>Emotion</th>
              <th className={th.className} style={{ color: "#c084fc" }}>MorphCSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td.className}>Zero Runtime</td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>Atomic Output</td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>Object Syntax</td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>Dynamic Values</td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>Runtime Cost</td>
              <td className={td.className}>None</td>
              <td className={td.className}>None</td>
              <td className={td.className}>None</td>
              <td className={td.className}>None</td>
              <td className={td.className} style={{ color: "#ef4444" }}>High</td>
              <td className={td.className}>None</td>
            </tr>
            <tr>
              <td className={td.className}>Rust Compiler</td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>Incremental Build</td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
            <tr>
              <td className={td.className}>HMR &lt; 5ms</td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={warn.className}>⚠️</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={cross.className}>❌</span></td>
              <td className={td.className}><span className={check.className}>✅</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
