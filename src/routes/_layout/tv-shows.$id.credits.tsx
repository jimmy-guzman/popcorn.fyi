import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaCredits } from "@/components/media/media-credits";
import { tvCreditsOptions } from "@/data/tv/details.credits";

export const Route = createFileRoute("/_layout/tv-shows/$id/credits")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvCreditsOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: credits } = useSuspenseQuery(tvCreditsOptions(id));

  return <MediaCredits credits={credits} />;
}
