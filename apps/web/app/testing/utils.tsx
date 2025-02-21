import type { RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import { ClerkProvider } from "@clerk/tanstack-start";
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
}

// eslint-disable-next-line react-refresh/only-export-components -- this is only used in tests.
const Wrapper = ({
  children,
  initialEntries,
  path,
  queryData,
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
      // eslint-disable-next-line react/no-unstable-nested-components -- testing purposes
      component: () => <ClerkProvider>{children}</ClerkProvider>,
      getParentRoute: () => rootRoute,
      path,
    });

    return {
      queryClient,
      router: createRouter({
        context: { queryClient },
        history: createMemoryHistory({ initialEntries }),
        routeTree: rootRoute.addChildren([testingRoute]),
      }),
    };
  }, [children, initialEntries, path, queryData]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-expect-error this is due to the testing router diverging from the application router */}
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

export { renderHook, screen, within } from "@testing-library/react";

export { customRender as render };
