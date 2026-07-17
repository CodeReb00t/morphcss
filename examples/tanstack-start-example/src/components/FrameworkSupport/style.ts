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
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "1rem",
  width: "100%",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
});

export const card = css({
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "1.5rem",
  borderRadius: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#f9fafb",
    transform: "scale(1.02)",
    borderColor: "#d1d5db",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
});

export const name = css({
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#111827",
});
