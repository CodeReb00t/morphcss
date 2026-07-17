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

export const pipeline = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
  width: "100%",
});

export const step = css({
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  padding: "1.5rem",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  minWidth: "120px",
  flex: "1 1 120px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#f9fafb",
    borderColor: "#d1d5db",
    transform: "translateY(-4px)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  "@media (min-width: 768px)": {
    minWidth: "160px",
    flex: "0 1 auto",
  },
});

export const arrow = css({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca3af",
  padding: "0 0.5rem",
  "@media (min-width: 768px)": {
    display: "flex",
  },
});

export const stepTitle = css({
  fontSize: "1rem",
  fontWeight: "600",
  color: "#111827",
  marginBottom: "0.5rem",
});

export const stepDesc = css({
  fontSize: "0.8rem",
  color: "#4b5563",
});
