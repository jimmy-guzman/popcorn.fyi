import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaWatch } from "@/components/media/media-watch";
import { movieWatchOptions } from "@/lib/movies";

export const Route = createFileRoute("/_layout/movies/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      movieWatchOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    movieWatchOptions(Number.parseInt(id)),
  );

  return watchProviders.results ? (
    <MediaWatch watchProviders={watchProviders.results} />
  ) : null;
}
