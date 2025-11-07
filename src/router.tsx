import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { Error } from "./components/shared/error";
import { NotFound } from "./components/shared/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
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
    createRouter({
      context: { queryClient },
      defaultErrorComponent: Error,
      defaultNotFoundComponent: NotFound,
      defaultPendingComponent: () => {
        return <div className="h-svh dsy-skeleton" />;
      },
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
