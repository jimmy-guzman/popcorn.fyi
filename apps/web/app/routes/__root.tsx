import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/tanstack-start";
import { dark } from "@clerk/themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { lazy } from "react";
import { Toaster } from "sonner";

import { site } from "@/config/site";
import { seo } from "@/lib/seo";

import rootCSS from "@popcorn.fyi/tailwind/tailwind.css?url";

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
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              error: "dsy-alert-error",
              info: "dsy-alert-info",
              loading: "dsy-alert-info",
              success: "dsy-alert-success",
              toast: "dsy-alert dsy-alert-vertical lg:dsy-alert-horizontal",
              warning: "dsy-alert-warning",
            },
            unstyled: true,
          }}
        />
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
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
