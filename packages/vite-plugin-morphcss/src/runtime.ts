export const hmrClientCode = `
if (import.meta.hot) {
  import.meta.hot.on("morphcss:update", (css) => {
    let style = document.getElementById("__morphcss");
    if (!style) {
      style = document.createElement("style");
      style.id = "__morphcss";
      document.head.appendChild(style);
    }
    style.textContent = css;
  });
}
`;
