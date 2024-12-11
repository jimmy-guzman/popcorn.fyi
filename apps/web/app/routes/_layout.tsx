import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";

function LayoutComponent() {
  return (
    <main>
      <Navigation />
      <Outlet />
      <SiteFooter />
    </main>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
