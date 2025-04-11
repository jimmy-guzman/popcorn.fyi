import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { movieSimilarOptions } from "@/api/movie/details.similar";
import { MovieCard } from "@/components/movie/movie-card";
import { ListContent } from "@/components/shared/list-content";
import { Prose } from "@/components/shared/prose";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/movies/$id/similar")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const movieId = v.parse(IdSchema, id);

    await context.queryClient.ensureQueryData(movieSimilarOptions(movieId));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: similar } = useSuspenseQuery(
    movieSimilarOptions(v.parse(IdSchema, id)),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-8">
        <Prose>
          <h2>Similar</h2>
        </Prose>
        <ListContent>
          {similar.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ListContent>
      </div>
    </div>
  );
}
