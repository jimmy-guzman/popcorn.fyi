import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { tvDetailsOptions } from "@/api/tv/details";
import { tvExternalOptions } from "@/api/tv/details.external";
import { TVShowDetails } from "@/components/tv/tv-show-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/tv-shows/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const tvShowId = Number.parseInt(id);

    const [data] = await Promise.all([
      context.queryClient.ensureQueryData(tvDetailsOptions(tvShowId)),
      context.queryClient.prefetchQuery(tvExternalOptions(tvShowId)),
    ]);

    return {
      title: data.name,
    };
  },
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title: `${loaderData.title} | TV Shows | ${site.title}`,
          })
        : undefined,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  const [{ data: tvShow }, { data: ids }] = useSuspenseQueries({
    queries: [
      tvDetailsOptions(Number.parseInt(id)),
      tvExternalOptions(Number.parseInt(id)),
    ],
  });

  return <TVShowDetails tvShow={tvShow} wikipediaUrl={ids.wikipedia_url} />;
}
