import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MediaCredits } from "@/components/media-credits";
import { tvCreditsOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/$id/credits")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(
      tvCreditsOptions(Number.parseInt(id)),
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: credits } = useSuspenseQuery(
    tvCreditsOptions(Number.parseInt(id)),
  );

  return <MediaCredits credits={credits} />;
}
