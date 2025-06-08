import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

/**
 * The main layout component for the application.
 * It includes the navigation drawer, site navigation, and footer.
 *
 * @returns The layout structure including navigation, content area, and footer.
 */
function LayoutComponent() {
  return (
    <div className="container mx-auto">
      <SiteNav />
      <main className="min-h-screen p-4 pb-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
