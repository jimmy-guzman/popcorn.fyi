import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { tvDetailsOptions } from "@/api/tv/details";
import { tvExternalOptions } from "@/api/tv/details.external";
import { TVShowDetails } from "@/components/tv/tv-show-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/tv-shows/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const tvShowId = v.parse(IdSchema, id);

    const data = await context.queryClient.ensureQueryData(
      tvDetailsOptions(tvShowId),
    );

    void context.queryClient.prefetchQuery(tvExternalOptions(tvShowId));

    return {
      seo: {
        image: data.poster_path ? tmdbImageUrl(data.poster_path) : undefined,
        title: data.name
          ? `${data.name} | TV Shows | ${site.title}`
          : `TV Shows | ${site.title}`,
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

  const { data: tvShow } = useSuspenseQuery(
    tvDetailsOptions(v.parse(IdSchema, id)),
  );

  return <TVShowDetails tvShow={tvShow} />;
}
