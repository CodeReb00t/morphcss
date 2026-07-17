import { css } from "@morph-css/kit";

export const container = css({
  padding: "3rem 1rem",
  maxWidth: "1000px",
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
  textAlign: "center",
  "@media (min-width: 768px)": {
    fontSize: "3rem",
    marginBottom: "2rem",
  },
});

export const content = css({
  color: "#4b5563",
  lineHeight: "1.7",
  fontSize: "1.1rem",
  "& p": {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 2rem auto",
  }
});
