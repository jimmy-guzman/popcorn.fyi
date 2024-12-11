import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/tv-shows")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-content-center">
      <div className="prose dsy-prose">
        <h1>
          <span className="icon-[lucide--construction] h-7 w-7" /> TV Shows
        </h1>
      </div>
    </div>
  );
}
