import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaCredits } from "@/components/media/media-credits";
import { movieCreditsOptions } from "@/data/movie/details.credits";

export const Route = createFileRoute("/_layout/movies/$id/credits")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(movieCreditsOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: credits } = useSuspenseQuery(movieCreditsOptions(id));

  return <MediaCredits credits={credits} />;
}
