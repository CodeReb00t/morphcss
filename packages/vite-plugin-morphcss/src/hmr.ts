import type { ViteDevServer } from "vite";

export function handleHmrUpdate(
  server: ViteDevServer,
  css: string,
  hash: string,
  currentHash: string
): string {
  if (hash !== currentHash) {
    server.ws.send({
      type: "custom",
      event: "morphcss:update",
      data: css,
    });
    return hash;
  }
  return currentHash;
}
