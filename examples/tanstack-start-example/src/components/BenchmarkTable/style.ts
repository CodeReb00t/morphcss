import { css } from "@morph-css/kit";

export const container = css({
  padding: "3rem 1rem",
  maxWidth: "1000px",
  margin: "0 auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: "10",
  position: "relative",
  "@media (min-width: 768px)": {
    padding: "6rem 2rem",
  },
});

export const title = css({
  fontSize: "2rem",
  fontWeight: "700",
  marginBottom: "2rem",
  textAlign: "center",
  color: "#111827",
  "@media (min-width: 768px)": {
    fontSize: "2.5rem",
    marginBottom: "3rem",
  },
});

export const grid = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2rem",
  width: "100%",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const table = css({
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
});

export const row = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.875rem 1rem",
  borderBottom: "1px solid #e5e7eb",
  transition: "background 0.2s ease",
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": {
    background: "#f9fafb",
  },
  "@media (min-width: 768px)": {
    padding: "1rem 1.5rem",
  },
});

export const metric = css({
  color: "#4b5563",
  fontWeight: "500",
  fontSize: "0.95rem",
});

export const value = css({
  color: "#111827",
  fontWeight: "600",
  fontFamily: "monospace",
  fontSize: "1rem",
});

export const methodology = css({
  marginTop: "2rem",
  padding: "1rem",
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  color: "#4b5563",
  fontSize: "0.875rem",
  textAlign: "center",
  width: "100%",
  "& strong": {
    color: "#111827",
  },
});
