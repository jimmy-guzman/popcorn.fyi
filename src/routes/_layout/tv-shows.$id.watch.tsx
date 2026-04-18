import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaWatch } from "@/components/media/media-watch";
import { tvSeriesProvidersOptions } from "@/data/tv/details.providers";

export const Route = createFileRoute("/_layout/tv-shows/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvSeriesProvidersOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    tvSeriesProvidersOptions(id),
  );

  return <MediaWatch watchProviders={watchProviders.results} />;
}
