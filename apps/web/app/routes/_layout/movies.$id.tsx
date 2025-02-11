import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { movieDetailsOptions } from "@/api/movie/details";
import { movieExternalOptions } from "@/api/movie/details.external";
import { MovieDetails } from "@/components/movie/movie-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const movieId = Number.parseInt(id);

    const [data] = await Promise.all([
      context.queryClient.ensureQueryData(movieDetailsOptions(movieId)),
      context.queryClient.prefetchQuery(movieExternalOptions(movieId)),
    ]);

    return {
      title: data.title,
    };
  },
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title: `${loaderData.title} | Movies | ${site.title}`,
          })
        : undefined,
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
