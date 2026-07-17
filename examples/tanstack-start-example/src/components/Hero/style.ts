import { css } from "@morph-css/kit";

export const hero = css({
  position: "relative",
  padding: "3rem 1rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  zIndex: "10",
  "@media (min-width: 768px)": {
    padding: "6rem 2rem 1rem",
  },
});

export const background = css({
  position: "absolute",
  inset: "0",
  zIndex: "-1",
  pointerEvents: "none",
  background: "#ffffff",
});

export const glow = css({
  position: "absolute",
  top: "-200px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "800px",
  height: "600px",
  background:
    "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 40%, rgba(0,0,0,0) 70%)",
  filter: "blur(60px)",
  borderRadius: "50%",
});

export const title = css({
  fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
  fontWeight: "800",
  lineHeight: "1.1",
  letterSpacing: "-0.04em",
  margin: "0 0 1.5rem 0",
  color: "#111827",
  "@media (min-width: 768px)": {
    margin: "0 0 2rem 0",
  },
});

export const subtitle = css({
  fontSize: "1rem",
  color: "#4b5563",
  lineHeight: "1.6",
  maxWidth: "600px",
  margin: "0 0 2rem 0",
  "@media (min-width: 768px)": {
    fontSize: "1.25rem",
    margin: "0 0 3rem 0",
  },
});

export const metricsGroup = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "3rem",
  maxWidth: "800px",
});

export const metricBadge = css({
  padding: "0.5rem 1rem",
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "9999px",
  color: "#374151",
  fontSize: "0.875rem",
  fontWeight: "500",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
});

export const ctaGroup = css({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
});
