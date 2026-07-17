import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { ErrorScreen } from "./components/ErrorScreen";
import { NotFoundScreen } from "./components/NotFoundScreen";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ErrorScreen,
    defaultNotFoundComponent: NotFoundScreen,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
