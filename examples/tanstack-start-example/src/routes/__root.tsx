import "@morph-css/kit/css"; // MorphCSS injection
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { bodyStyle, mainWrapper } from "./root.style";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "MorphCSS | Zero-runtime atomic CSS-in-JS",
      },
      {
        name: "description",
        content: "MorphCSS is a blazingly fast, zero-runtime atomic CSS-in-JS compiler built in Rust. It generates optimal CSS at build time with no JavaScript overhead.",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: "*, *::before, *::after { box-sizing: border-box; }" }} />
      </head>
      <body className={bodyStyle.className}>
        <Header />
        <main className={mainWrapper.className}>{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
