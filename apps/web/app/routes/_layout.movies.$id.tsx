import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieDetails } from "@/components/movie-details";
import { movieDetailsFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/movies/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const getMovieDetails = useServerFn(movieDetailsFn);

  const { data: movie } = useQuery({
    queryFn: () => {
      return getMovieDetails({ data: Number.parseInt(id) });
    },
    queryKey: ["movies", id],
  });

  return <div>{movie ? <MovieDetails movie={movie} /> : null}</div>;
}
