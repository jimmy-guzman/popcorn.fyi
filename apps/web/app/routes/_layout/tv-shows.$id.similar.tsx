import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { tvSimilarOptions } from "@/api/tv/details.similar";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { TVShowCard } from "@/components/tv/tv-show-card";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/tv-shows/$id/similar")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const tvId = v.parse(IdSchema, id);

    await context.queryClient.ensureQueryData(tvSimilarOptions(tvId));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: similar } = useSuspenseQuery(
    tvSimilarOptions(v.parse(IdSchema, id)),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-8">
        <Prose>
          <h2>Similar</h2>
        </Prose>
        <ListContent>
          {similar.results?.map((tvShow) => (
            <TVShowCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </ListContent>
      </div>
    </div>
  );
}
