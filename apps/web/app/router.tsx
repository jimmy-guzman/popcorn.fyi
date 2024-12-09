import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { ErrorPage } from "./pages/error";
import { NotFound } from "./pages/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    defaultErrorComponent: ErrorPage,
    defaultNotFoundComponent: NotFound,
    defaultPreload: "intent",
    routeTree,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
