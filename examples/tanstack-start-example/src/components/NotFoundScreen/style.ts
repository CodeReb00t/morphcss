import { css } from "@morph-css/kit";

export const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh",
  padding: "2rem",
  textAlign: "center",
});

export const title = css({
  fontSize: "4rem",
  fontWeight: "800",
  color: "#111827",
  marginBottom: "1rem",
  letterSpacing: "-0.025em",
});

export const message = css({
  color: "#4b5563",
  marginBottom: "2rem",
  fontSize: "1.15rem",
});

export const button = css({
  padding: "0.75rem 1.5rem",
  background: "#111827",
  color: "#ffffff",
  borderRadius: "0.5rem",
  textDecoration: "none",
  fontWeight: "600",
  transition: "background 0.2s ease",
  "&:hover": {
    background: "#374151",
  },
});
