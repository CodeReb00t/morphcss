import { container, footer, text } from "./style";

export function Footer() {
  return (
    <footer className={footer.className}>
      <div className={container.className}>
        <p className={text.className}>
          © {new Date().getFullYear()} MorphCSS. Built for performance.
        </p>
      </div>
    </footer>
  );
}
