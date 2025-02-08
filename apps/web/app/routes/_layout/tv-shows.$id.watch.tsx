import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvSeriesProvidersOptions } from "@/api/tv/details.providers";
import { MediaWatch } from "@/components/media/media-watch";

export const Route = createFileRoute("/_layout/tv-shows/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvSeriesProvidersOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    tvSeriesProvidersOptions(Number.parseInt(id)),
  );

  return watchProviders.results ? (
    <MediaWatch watchProviders={watchProviders.results} />
  ) : null;
}
