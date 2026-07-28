import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { TVShowCard } from "@/components/tv/tv-show-card";
import { tvRecommendationsOptions } from "@/data/tv/details.recommendations";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/tv-shows/$id/recommendations")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvRecommendationsOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: recommendations } = useSuspenseQuery(
    tvRecommendationsOptions(id),
  );

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Recommendations</h2>
      </Prose>
      <ListContent>
        {orEmpty(recommendations.results)
          .filter(hasId)
          .map((tvShow) => {
            return <TVShowCard key={tvShow.id} tvShow={tvShow} />;
          })}
      </ListContent>
    </section>
  );
}
