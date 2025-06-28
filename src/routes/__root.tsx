import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import HolyLoader from "holy-loader";
import { Toaster } from "sonner";

import { site } from "@/config/site";
import { seo } from "@/lib/seo";

import rootCSS from "@/styles/global.css?url";

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <HolyLoader color="var(--color-neutral-content)" ignoreSearchParams />
      <head>
        <HeadContent />
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
