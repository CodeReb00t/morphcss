import { css } from "@morph-css/kit";

export const container = css({
  padding: "6rem 2rem",
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: "10",
  position: "relative",
});

export const title = css({
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: "1rem",
  textAlign: "center",
  color: "#111827",
});

export const subtitle = css({
  fontSize: "1.15rem",
  color: "#4b5563",
  textAlign: "center",
  maxWidth: "700px",
  marginBottom: "4rem",
});

export const grid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
  width: "100%",
});

export const card = css({
  background: "#09090b",
  border: "1px solid #e5e7eb",
  borderRadius: "1rem",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
});

export const cardTitle = css({
  padding: "0.75rem 1.25rem",
  background: "#f3f4f6",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#111827",
});

export const pre = css({
  margin: 0,
  padding: "1.5rem",
  overflowX: "auto",
  fontSize: "0.9rem",
  lineHeight: "1.6",
  fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  flex: 1,
  color: "#f9fafb",
});

export const keyword = css({ color: "#c678dd" });
export const string = css({ color: "#98c379" });
export const token = css({ color: "#6b7280" });
