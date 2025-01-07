import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/tanstack-start";
import { getAuth } from "@clerk/tanstack-start/server";
import { dark } from "@clerk/themes";
import { theme } from "@popcorn.fyi/tailwind/theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { lazy } from "react";
import { getWebRequest } from "vinxi/http";

import { ThemeScript } from "@/components/theme-script";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

import rootCSS from "./__root.css?url";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  return {
    userId,
  };
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => {
        return null;
      }
    : lazy(async () => {
        const res = await import("@tanstack/router-devtools");

        return {
          default: res.TanStackRouterDevtools,
        };
      });

function RootComponent() {
  return (
    <ClerkProvider appearance={{ baseTheme: [dark] }}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html data-theme={theme.dark} lang="en" suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
        <ThemeScript />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();

    return {
      userId,
    };
  },
  head: () => {
    return {
      links: [{ href: rootCSS, rel: "stylesheet" }],
      meta: [
        {
          charSet: "utf8",
        },
        {
          content: "width=device-width, initial-scale=1",
          name: "viewport",
        },
        ...seo(site),
      ],
    };
  },
});
