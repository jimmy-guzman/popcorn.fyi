import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { personDetailsOptions } from "@/api/people/details";
import { personExternalOptions } from "@/api/people/details.external";
import { PersonDetails } from "@/components/people/person-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/people/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const personId = Number.parseInt(id);

    const [data] = await Promise.all([
      context.queryClient.ensureQueryData(personDetailsOptions(personId)),
      context.queryClient.prefetchQuery(personExternalOptions(personId)),
    ]);

    return {
      title: data.name,
    };
  },
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title: `${loaderData.title} | People | ${site.title}`,
          })
        : undefined,
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
