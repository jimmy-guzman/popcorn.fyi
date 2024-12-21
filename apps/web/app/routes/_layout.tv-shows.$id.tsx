import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowDetails } from "@/components/tv-show-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvDetailsOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/$id")({
  component: RouteComponent,
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title:
              // @ts-expect-error TODO: look into why title is undefined
              `${loaderData.title} | TV Shows | ${site.title}`,
          })
        : undefined,
    };
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      tvDetailsOptions(Number.parseInt(id)),
    );

    return {
      title: data.name,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: tvShow } = useSuspenseQuery(
    tvDetailsOptions(Number.parseInt(id)),
  );

  return <TVShowDetails tvShow={tvShow} />;
}
