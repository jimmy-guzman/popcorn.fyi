import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaWatch } from "@/components/media-watch";
import { tvWatchProvidersOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvWatchProvidersOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    tvWatchProvidersOptions(Number.parseInt(id)),
  );

  return watchProviders?.results ? (
    <MediaWatch watchProviders={watchProviders.results} />
  ) : null;
}
