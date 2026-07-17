import { container, title, pipeline, step, arrow, stepTitle, stepDesc } from "./style";
import { ArrowRight } from "lucide-react";
import { css } from "@morph-css/kit";

const STEPS = [
  { title: "AST Parsing", desc: "Oxc parses TSX instantly" },
  { title: "Hash Generation", desc: "BLAKE3 generates deterministic IDs" },
  { title: "Atomic Extraction", desc: "Properties are split into atomic rules" },
  { title: "Variable Extraction", desc: "Dynamic values map to CSS vars" },
  { title: "CSS Emission", desc: "Rules are deduplicated & minified" },
  { title: "Final Bundle", desc: "Zero-runtime CSS is injected" },
];

export function CompilerPipeline() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Microsecond Compiler Pipeline</h2>
      <div className={pipeline.className}>
        <div className={step.className}>
          <div className={stepTitle.className}>style.ts</div>
          <div className={stepDesc.className}>Your source code</div>
        </div>
        
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className={arrow.className}>
              <ArrowRight className={css({ width: "20px", height: "20px", color: "#6366f1" }).className} />
            </div>
            <div className={step.className}>
              <div className={stepTitle.className}>{s.title}</div>
              <div className={stepDesc.className}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
