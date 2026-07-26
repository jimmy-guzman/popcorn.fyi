import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieCard } from "@/components/movie/movie-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { movieRecommendationsOptions } from "@/data/movie/details.recommendations";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/movies/$id/recommendations")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(movieRecommendationsOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: recommendations } = useSuspenseQuery(
    movieRecommendationsOptions(id),
  );

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Recommendations</h2>
      </Prose>
      <ListContent>
        {recommendations.results?.filter(hasId).map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContent>
    </section>
  );
}
