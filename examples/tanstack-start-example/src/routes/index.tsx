import { createFileRoute } from "@tanstack/react-router";
import { BenchmarkTable } from "../components/BenchmarkTable";
import { ComparisonTable } from "../components/ComparisonTable";
import { CompilerPipeline } from "../components/CompilerPipeline";
import { Features } from "../components/Features";
import { FrameworkSupport } from "../components/FrameworkSupport";
import { GeneratedOutput } from "../components/GeneratedOutput";
import { Hero } from "../components/Hero";
import { InstallGuide } from "../components/InstallGuide";
import { pageContainer } from "./index.style";

export const Route = createFileRoute("/")({ 
  component: Home,
  head: () => ({
    meta: [
      { title: "MorphCSS | Build faster with zero-runtime CSS" },
      { name: "description", content: "MorphCSS is a rust-powered zero-runtime atomic CSS-in-JS library. Build beautiful, high-performance UIs at scale without the hydration mismatch." }
    ]
  })
});

function Home() {
  return (
    <div className={pageContainer.className}>
      <Hero />
      <BenchmarkTable />
      <CompilerPipeline />
      <ComparisonTable />
      <Features />
      <GeneratedOutput />
      <FrameworkSupport />
    </div>
  );
}
