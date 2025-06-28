import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvSimilarOptions } from "@/api/tv/details.similar";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { TVShowCard } from "@/components/tv/tv-show-card";

export const Route = createFileRoute("/_layout/tv-shows/$id/similar")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvSimilarOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: similar } = useSuspenseQuery(tvSimilarOptions(id));

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2 id="similar">Similar</h2>
      </Prose>
      <ListContent>
        {similar.results?.map((tvShow) => (
          <TVShowCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </ListContent>
    </section>
  );
}
