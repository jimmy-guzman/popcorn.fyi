import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { movieDetailsOptions } from "@/api/movie/details";
import { movieExternalOptions } from "@/api/movie/details.external";
import { MovieDetails } from "@/components/movie/movie-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tmdbImageUrl } from "@/lib/tmdb-images";
import { PathParamsSchema } from "@/schemas/path-params";

export const Route = createFileRoute("/_layout/movies/$id")({
  component: RouteComponent,
  params: {
    parse: (params) => v.parse(PathParamsSchema, params),
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      movieDetailsOptions(id),
    );

    void context.queryClient.prefetchQuery(movieExternalOptions(id));

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
      meta: loaderData ? seo(loaderData.seo) : undefined,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: movie } = useSuspenseQuery(movieDetailsOptions(id));

  return <MovieDetails movie={movie} />;
}
