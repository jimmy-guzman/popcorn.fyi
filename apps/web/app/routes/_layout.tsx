import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

function LayoutComponent() {
  return (
    <main>
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
