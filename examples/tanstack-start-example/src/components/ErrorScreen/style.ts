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
  fontSize: "2rem",
  fontWeight: "700",
  color: "#ef4444", // red-500
  marginBottom: "1rem",
});

export const message = css({
  color: "#4b5563",
  marginBottom: "2rem",
  maxWidth: "600px",
  lineHeight: "1.6",
});

export const button = css({
  padding: "0.75rem 1.5rem",
  background: "#111827",
  color: "#ffffff",
  borderRadius: "0.5rem",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.2s ease",
  "&:hover": {
    background: "#374151",
  },
});
