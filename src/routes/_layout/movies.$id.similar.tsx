import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieSimilarOptions } from "@/api/movie/details.similar";
import { MovieCard } from "@/components/movie/movie-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";

export const Route = createFileRoute("/_layout/movies/$id/similar")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(movieSimilarOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: similar } = useSuspenseQuery(movieSimilarOptions(id));

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Similar</h2>
      </Prose>
      <ListContent>
        {similar.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ListContent>
    </section>
  );
}
