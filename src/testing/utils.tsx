import type { AnyValidator } from "@tanstack/react-router";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { act, cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useMemo } from "react";
import { afterEach } from "vitest";

import type { FileRoutesById } from "@/routeTree.gen";

afterEach(() => {
  cleanup();
});

interface WrapperProps {
  children: ReactNode;
  initialEntries: string[];
  path: keyof FileRoutesById;
  queryData?: [key: unknown[], data: unknown][];
  /** Match production route `validateSearch` so `useSearch` / `navigate` behave like the app. */
  validateSearch?: AnyValidator;
}

// eslint-disable-next-line react-refresh/only-export-components -- this is only used in tests.
const Wrapper = ({
  children,
  initialEntries,
  path,
  queryData,
  validateSearch,
}: WrapperProps) => {
  const { queryClient, router } = useMemo(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    if (queryData) {
      for (const [key, data] of queryData) {
        queryClient.setQueryData(key, data);
      }
    }

    const rootRoute = createRootRoute();
    const testingRoute = createRoute({
      getParentRoute: () => rootRoute,
      path,
      validateSearch,
      component: () => children,
    });

    return {
      queryClient,
      router: createRouter({
        context: { queryClient },
        history: createMemoryHistory({ initialEntries }),
        routeTree: rootRoute.addChildren([testingRoute]),
      }),
    };
  }, [children, initialEntries, path, queryData, validateSearch]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const customRender = async (
  ui: ReactElement,
  {
    path = "/_layout",
    initialEntries = [path],
    queryData = [],
    validateSearch,
    ...options
  }: Omit<RenderOptions, "wrapper"> & Partial<WrapperProps> = {},
) => {
  // eslint-disable-next-line @typescript-eslint/require-await -- prevents was not wrapped in act(...).
  const result = await act(async () => {
    return render(ui, {
      wrapper: ({ children }) => {
        return (
          <Wrapper
            initialEntries={initialEntries}
            path={path}
            queryData={queryData}
            validateSearch={validateSearch}
          >
            {children}
          </Wrapper>
        );
      },
      ...options,
    });
  });

  return {
    user: userEvent.setup(),
    ...result,
  };
};

export { screen, waitFor } from "@testing-library/react";

export { customRender as render };
