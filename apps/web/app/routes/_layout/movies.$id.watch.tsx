import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieProvidersOptions } from "@/api/movie/details.providers";
import { MediaWatch } from "@/components/media/media-watch";

export const Route = createFileRoute("/_layout/movies/$id/watch")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      movieProvidersOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(
    movieProvidersOptions(Number.parseInt(id)),
  );

  return watchProviders.results ? (
    <MediaWatch watchProviders={watchProviders.results} />
  ) : null;
}
