import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { movieDetailsOptions } from "@/api/movie/details";
import { movieExternalOptions } from "@/api/movie/details.external";
import { MovieDetails } from "@/components/movie/movie-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/movies/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const movieId = v.parse(IdSchema, id);

    const [data] = await Promise.all([
      context.queryClient.ensureQueryData(movieDetailsOptions(movieId)),
      context.queryClient.ensureQueryData(movieExternalOptions(movieId)),
    ]);

    return {
      seo: {
        image: data.poster_path ? tmdbImageUrl(data.poster_path) : undefined,
        title: data.title
          ? `${data.title} | Movies | ${site.title}`
          : `Movies | ${site.title}`,
      },
    };
  },
  head: ({ loaderData }) => {
    return {
      meta: seo(loaderData.seo),
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [{ data: movie }, { data: ids }] = useSuspenseQueries({
    queries: [
      movieDetailsOptions(Number.parseInt(id)),
      movieExternalOptions(Number.parseInt(id)),
    ],
  });

  return <MovieDetails movie={movie} wikipediaUrl={ids.wikipedia_url} />;
}
