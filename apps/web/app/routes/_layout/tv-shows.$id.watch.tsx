import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvProvidersOptions } from "@/api/tv/providers";
import { MediaWatch } from "@/components/media-watch";

export const Route = createFileRoute("/_layout/tv-shows/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvProvidersOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    tvProvidersOptions(Number.parseInt(id)),
  );

  return watchProviders.results ? (
    <MediaWatch watchProviders={watchProviders.results} />
  ) : null;
}
