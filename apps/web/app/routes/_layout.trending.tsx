import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/trending")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Trending</h1>;
}
