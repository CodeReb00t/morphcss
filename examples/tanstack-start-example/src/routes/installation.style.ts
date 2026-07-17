import { css } from "@morph-css/kit";

export const container = css({
  padding: "3rem 1rem",
  maxWidth: "800px",
  margin: "0 auto",
  width: "100%",
  flex: "1",
  "@media (min-width: 768px)": {
    padding: "4rem 2rem",
  },
});

export const title = css({
  fontSize: "2rem",
  fontWeight: "800",
  marginBottom: "1.5rem",
  color: "#111827",
  "@media (min-width: 768px)": {
    fontSize: "3rem",
    marginBottom: "2rem",
  },
});

export const content = css({
  color: "#4b5563",
  lineHeight: "1.7",
  fontSize: "1.1rem",
  "& h2": {
    color: "#111827",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  "& h3": {
    color: "#111827",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  },
  "& p": {
    marginBottom: "1rem",
  },
  "& pre": {
    background: "#09090b",
    color: "#f9fafb",
    padding: "1rem",
    borderRadius: "0.5rem",
    overflowX: "auto",
    fontSize: "0.95rem",
    marginBottom: "1.5rem",
  },
  "& code": {
    fontFamily: "monospace",
  },
});
