import { css, cx } from "@morph-css/kit";
import * as styles from "./style";
export default function Home() {
  const dynamicBtn = styles.buttonPrimary("blue");

  return (
    <main {...styles.container}>
      <h1 className={styles.heading.className}>Hello, MorphCSS!</h1>
      <p className={styles.subtitle.className}>
        Zero-runtime atomic CSS-in-JS for Next.js and Vite.
      </p>

      <div className={styles.card.className}>
        <p
          className={
            css({ color: "#888", textAlign: "center", margin: 0 }).className
          }
        >
          This entire page is styled using 100% atomic, zero-runtime CSS
          generated at build time.
        </p>

        <button
          className={cx(styles.buttonBase.className, dynamicBtn.className)}
          style={dynamicBtn.style}
        >
          Click me
        </button>
      </div>
    </main>
  );
}
