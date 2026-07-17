import { css } from "@morph-css/kit";

export const footer = css({
  marginTop: "auto",
  borderTop: "1px solid #e5e7eb",
  background: "#ffffff",
  padding: "2rem 0",
});

export const container = css({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
  textAlign: "center",
  "@media (min-width: 768px)": {
    padding: "0 2rem",
  },
});

export const text = css({
  color: "#6b7280",
  fontSize: "0.875rem",
});
