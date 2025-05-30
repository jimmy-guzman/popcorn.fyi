import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvCreditsOptions } from "@/api/tv/details.credits";
import { MediaCredits } from "@/components/media/media-credits";

export const Route = createFileRoute("/_layout/tv-shows/$id/credits")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvCreditsOptions(Number.parseInt(id, 10)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: credits } = useSuspenseQuery(
    tvCreditsOptions(Number.parseInt(id, 10)),
  );

  return <MediaCredits credits={credits} />;
}
