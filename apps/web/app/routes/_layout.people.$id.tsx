import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PersonDetails } from "@/components/person-details";
import { site } from "@/config/site";
import { personDetailsOptions } from "@/lib/people";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/people/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      personDetailsOptions(Number.parseInt(id)),
    );

    return {
      title: data.name,
    };
  },
  // eslint-disable-next-line perfectionist/sort-objects -- head is not inferred correctly when above loader.
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
  const { data: person } = useSuspenseQuery(
    personDetailsOptions(Number.parseInt(id)),
  );

  return <PersonDetails person={person} />;
}
