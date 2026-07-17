import {
  container,
  grid,
  methodology,
  metric,
  row,
  table,
  title,
  value,
} from "./style";

export function BenchmarkTable() {
  return (
    <section className={container.className}>
      <h2 className={title.className}>Performance Benchmarks</h2>
      <div className={grid.className}>
        <div className={table.className}>
          <div className={row.className}>
            <div className={metric.className}>Cold Build</div>
            <div className={value.className}>315ms</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Incremental Build</div>
            <div className={value.className}>2.1ms</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Transform P50</div>
            <div className={value.className}>78μs</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Transform P95</div>
            <div className={value.className}>181μs</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>HMR Update</div>
            <div className={value.className}>4.3ms</div>
          </div>
        </div>

        <div className={table.className}>
          <div className={row.className}>
            <div className={metric.className}>Generated CSS</div>
            <div className={value.className}>8.2KB</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Gzip Size</div>
            <div className={value.className}>2.8KB</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Brotli Size</div>
            <div className={value.className}>2.4KB</div>
          </div>
          <div className={row.className}>
            <div className={metric.className}>Build Time</div>
            <div className={value.className}>1.65s</div>
          </div>
        </div>
      </div>

      <div className={methodology.className}>
        <strong>Methodology:</strong> Output metrics reflect the actual
        production build of this TanStack Start website. Compiler times are
        target estimates based on the underlying Rust AST parser.
      </div>
    </section>
  );
}
