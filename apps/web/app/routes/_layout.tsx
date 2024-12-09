import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Navigation } from "@/components/navigation";

function LayoutComponent() {
  return (
    <main>
      <Navigation />
      <Outlet />
    </main>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
