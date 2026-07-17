import { css } from "@morph-css/kit";

export const container = css({
  padding: "3rem 1rem",
  maxWidth: "1200px",
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
  marginBottom: "2.5rem",
  textAlign: "center",
  color: "#111827",
  "@media (min-width: 768px)": {
    fontSize: "2.5rem",
    marginBottom: "4rem",
  },
});

export const grid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "2rem",
  width: "100%",
});

export const card = css({
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "2rem",
  borderRadius: "1.5rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  "&:hover": {
    background: "#f9fafb",
    transform: "translateY(-4px)",
    border: "1px solid #d1d5db",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
});



export const featureTitle = css({
  fontSize: "1.15rem",
  fontWeight: "600",
  color: "#111827",
  margin: "0",
});

export const featureDesc = css({
  color: "#4b5563",
  lineHeight: "1.6",
  fontSize: "0.95rem",
  margin: "0",
});
