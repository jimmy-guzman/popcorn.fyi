import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { Error } from "./components/shared/error";
import { NotFound } from "./components/shared/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 300_000,
      },
    },
  });

  const router = routerWithQueryClient(
    createTanStackRouter({
      context: { queryClient },
      defaultErrorComponent: Error,
      defaultNotFoundComponent: NotFound,
      defaultPendingComponent: () => <div className="dsy-skeleton h-svh" />,
      defaultPendingMs: 0,
      defaultPreload: "intent",
      defaultStructuralSharing: true,
      routeTree,
      scrollRestoration: true,
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
