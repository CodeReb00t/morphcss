import { css } from "@morph-css/kit";

export const header = css({
  position: "sticky",
  top: "0",
  zIndex: "50",
  width: "100%",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderBottom: "1px solid #e5e7eb",
  background: "rgba(255, 255, 255, 0.8)",
});

export const container = css({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "1rem",
  "@media (min-width: 768px)": {
    padding: "1rem 2rem",
  },
});

export const navContainer = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const desktopNav = css({
  display: "none",
  alignItems: "center",
  gap: "2rem",
  "@media (min-width: 768px)": {
    display: "flex",
  },
});

export const mobileNavToggle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#111827",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  "@media (min-width: 768px)": {
    display: "none",
  },
});

export const mobileMenu = css({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "@media (min-width: 768px)": {
    display: "none",
  },
});

export const mobileNavLink = css({
  color: "#4b5563",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "500",
  padding: "0.5rem 0",
  borderBottom: "1px solid #f3f4f6",
  "&:hover": {
    color: "#111827",
  },
});

export const logo = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  textDecoration: "none",
  color: "#111827",
});

export const logoText = css({
  fontSize: "1.25rem",
  fontWeight: "700",
  letterSpacing: "-0.025em",
  color: "#111827",
});

export const navLink = css({
  color: "#4b5563",
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: "500",
  transition: "color 0.2s ease",
  "&:hover": {
    color: "#111827",
  },
});

export const navButton = css({
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  color: "#111827",
  padding: "0.5rem 1rem",
  borderRadius: "9999px",
  fontSize: "0.9rem",
  fontWeight: "500",
  textDecoration: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "#e5e7eb",
    transform: "translateY(-1px)",
  },
});
