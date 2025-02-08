import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { toast } from "sonner";

import { Error } from "./components/shared/error";
import { NotFound } from "./components/shared/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          toast.error(error.message);
        },
      },
    },
  });

  const router = routerWithQueryClient(
    createTanStackRouter({
      context: { queryClient },
      defaultErrorComponent: Error,
      defaultNotFoundComponent: NotFound,
      defaultPendingComponent: () => {
        return <div className="dsy-skeleton h-svh" />;
      },
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
