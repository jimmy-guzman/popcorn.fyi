import { createFileRoute } from "@tanstack/react-router";

import { Prose } from "@/components/prose";

export const Route = createFileRoute("/_layout/_authed/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[calc(100vh-68px)] items-center justify-center">
      <Prose>
        <h1>
          Under Construction{" "}
          <span className="icon-[lucide--construction] h-12 w-12 align-middle" />
        </h1>
      </Prose>
    </div>
  );
}
