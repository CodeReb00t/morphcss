import { css } from "@morph-css/kit";

export const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "2rem",
  fontFamily: "system-ui, sans-serif",
});

export const heading = css({
  fontSize: "4rem",
  fontWeight: "bold",
  background: "linear-gradient(to right, #007cf0, #00dfd8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 1rem",
  textAlign: "center",
});

export const subtitle = css({
  fontSize: "1.5rem",
  color: "#666",
  marginBottom: "3rem",
  textAlign: "center",
});

export const buttonBase = css({
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
  border: "none",
  "&:hover": {
    transform: "translateY(-2px)",
    padding: "444rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

export const buttonPrimary = (color: string) =>
  css({
    background: color,
    color: "white",
  });

export const card = css({
  padding: "2rem",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  maxWidth: "400px",
  width: "100%",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
});
