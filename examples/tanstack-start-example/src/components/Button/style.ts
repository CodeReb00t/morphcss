import { css } from "@morph-css/kit";

export const baseButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "0.875rem 1.5rem",
  borderRadius: "9999px",
  fontSize: "0.95rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  textDecoration: "none",
  border: "1px solid transparent",
});

export const primaryButton = css({
  background: "#000000",
  color: "#ffffff",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#111827",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

export const secondaryButton = css({
  background: "#ffffff",
  color: "#374151",
  border: "1px solid #d1d5db",
  "&:hover": {
    background: "#f9fafb",
    borderColor: "#9ca3af",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
});
