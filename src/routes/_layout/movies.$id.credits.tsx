import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieCreditsOptions } from "@/api/movie/details.credits";
import { MediaCredits } from "@/components/media/media-credits";

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
