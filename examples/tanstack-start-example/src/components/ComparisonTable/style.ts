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

export const tableWrapper = css({
  width: "100%",
  overflowX: "auto",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
});

export const table = css({
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "800px",
});

export const th = css({
  padding: "1.25rem 1rem",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "0.95rem",
  color: "#111827",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
});

export const td = css({
  padding: "1rem",
  color: "#4b5563",
  fontSize: "0.9rem",
  borderBottom: "1px solid #e5e7eb",
  transition: "background 0.2s ease",
  "&:hover": {
    background: "#f3f4f6",
  },
});

export const check = css({
  filter: "drop-shadow(0 0 2px rgba(34, 197, 94, 0.2))",
});

export const warn = css({
  filter: "drop-shadow(0 0 2px rgba(234, 179, 8, 0.2))",
});

export const cross = css({
  opacity: "0.5",
  filter: "grayscale(100%)",
});

export const logoCell = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
