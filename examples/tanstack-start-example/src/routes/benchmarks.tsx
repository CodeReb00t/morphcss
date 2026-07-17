import { createFileRoute } from "@tanstack/react-router";
import { container, title, content } from "./benchmarks.style";
import { BenchmarkTable } from "../components/BenchmarkTable";
import { ComparisonTable } from "../components/ComparisonTable";

export const Route = createFileRoute("/benchmarks")({ 
  component: Benchmarks,
  head: () => ({
    meta: [
      { title: "Benchmarks | MorphCSS" },
      { name: "description", content: "See how MorphCSS compares against Emotion, Styled Components, and Tailwind in CSS payload, build times, and runtime overhead." }
    ]
  })
});

function Benchmarks() {
  return (
    <div className={container.className}>
      <h1 className={title.className}>Benchmarks</h1>
      <div className={content.className}>
        <p>
          MorphCSS is designed to be the fastest atomic CSS engine available, scaling seamlessly 
          for massive enterprise applications without slowing down Hot Module Replacement (HMR).
        </p>
        <BenchmarkTable />
        <ComparisonTable />
      </div>
    </div>
  );
}
