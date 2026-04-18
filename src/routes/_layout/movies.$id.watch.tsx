import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaWatch } from "@/components/media/media-watch";
import { movieProvidersOptions } from "@/data/movie/details.providers";

export const Route = createFileRoute("/_layout/movies/$id/watch")({
  component: RouteComponent,

  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(movieProvidersOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: watchProviders } = useSuspenseQuery(movieProvidersOptions(id));

  return <MediaWatch watchProviders={watchProviders.results} />;
}
