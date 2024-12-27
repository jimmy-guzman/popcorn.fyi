import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaCredits } from "@/components/media-credits";
import { movieCreditsOptions } from "@/lib/movies";

export const Route = createFileRoute("/_layout/movies/$id/credits")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      movieCreditsOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: credits } = useSuspenseQuery(
    movieCreditsOptions(Number.parseInt(id)),
  );

  return credits ? <MediaCredits credits={credits} /> : null;
}
