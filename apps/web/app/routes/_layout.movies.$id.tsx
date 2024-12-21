import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieDetails } from "@/components/movie-details";
import { site } from "@/config/site";
import { movieDetailsOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/$id")({
  component: RouteComponent,
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title:
              // @ts-expect-error TODO: look into why title is undefined
              `${loaderData.title} | Movies | ${site.title}`,
          })
        : undefined,
    };
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      movieDetailsOptions(Number.parseInt(id)),
    );

    return {
      title: data.title,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: movie } = useSuspenseQuery(
    movieDetailsOptions(Number.parseInt(id)),
  );

  return <MovieDetails movie={movie} />;
}
