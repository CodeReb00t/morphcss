import {
  background,
  glow,
  hero,
  metricBadge,
  metricsGroup,
  title,
} from "./style";

export function Hero() {
  return (
    <section className={hero.className}>
      <div className={background.className}>
        <div className={glow.className} />
      </div>

      <h1 className={title.className}>
        Rust-powered atomic CSS compiler <br />
        with zero runtime and object syntax DX.
      </h1>

      <div className={metricsGroup.className}>
        <div className={metricBadge.className}>30μs–250μs transforms</div>
        <div className={metricBadge.className}>0KB runtime</div>
        <div className={metricBadge.className}>162B generated CSS</div>
        <div className={metricBadge.className}>&lt;5ms HMR</div>
        <div className={metricBadge.className}>Rust compiler</div>
        <div className={metricBadge.className}>Atomic output</div>
      </div>
    </section>
  );
}
