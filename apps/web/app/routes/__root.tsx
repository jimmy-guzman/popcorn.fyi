import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/tanstack-start";
import { dark } from "@clerk/themes";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";

import { ThemeScript } from "@/components/theme-script";

import rootCSS from "./__root.css?url";

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
    <html data-theme="dark" lang="en" suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <ThemeScript />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
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
        {
          title: "Popcorn FYI",
        },
      ],
    };
  },
});
