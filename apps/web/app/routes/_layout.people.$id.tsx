import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PersonDetails } from "@/components/person-detail";
import { site } from "@/config/site";
import { personDetailsOptions } from "@/lib/people";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/people/$id")({
  component: RouteComponent,
  head: ({ loaderData }) => {
    return {
      meta: loaderData
        ? seo({
            title:
              // @ts-expect-error TODO: look into why title is undefined
              `${loaderData.title} | People | ${site.title}`,
          })
        : undefined,
    };
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      personDetailsOptions(Number.parseInt(id)),
    );

    return {
      title: data.name,
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
