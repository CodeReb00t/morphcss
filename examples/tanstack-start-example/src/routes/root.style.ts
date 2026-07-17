import { css } from "@morph-css/kit";

export const bodyStyle = css({
  margin: 0,
  padding: 0,
  backgroundColor: "#ffffff",
  color: "#111827",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const mainWrapper = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflowX: "hidden",
});
