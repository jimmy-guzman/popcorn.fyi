import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { personDetailsOptions } from "@/api/people/details";
import { personExternalOptions } from "@/api/people/details.external";
import { PersonDetails } from "@/components/people/person-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { IdSchema } from "@/schemas/id";

export const Route = createFileRoute("/_layout/people/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const personId = v.parse(IdSchema, id);

    const [data] = await Promise.all([
      context.queryClient.ensureQueryData(personDetailsOptions(personId)),
      context.queryClient.ensureQueryData(personExternalOptions(personId)),
    ]);

    return {
      seo: {
        image: data.profile_path ? tmdbImageUrl(data.profile_path) : undefined,
        title: data.name
          ? `${data.name} | People | ${site.title}`
          : `People | ${site.title}`,
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

  const [{ data: person }, { data: ids }] = useSuspenseQueries({
    queries: [
      personDetailsOptions(Number.parseInt(id)),
      personExternalOptions(Number.parseInt(id)),
    ],
  });

  return <PersonDetails person={person} wikipediaUrl={ids.wikipedia_url} />;
}
