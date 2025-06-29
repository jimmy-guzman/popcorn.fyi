import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

import { personDetailsOptions } from "@/api/people/details";
import { personExternalOptions } from "@/api/people/details.external";
import { PersonDetails } from "@/components/people/person-details";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tmdbImageUrl } from "@/lib/tmdb-images";
import { PathParamsSchema } from "@/schemas/path-params";

export const Route = createFileRoute("/_layout/people/$id")({
  component: RouteComponent,
  params: {
    parse: (params) => v.parse(PathParamsSchema, params),
  },
  loader: async ({ context, params: { id } }) => {
    const data = await context.queryClient.ensureQueryData(
      personDetailsOptions(id),
    );

    void context.queryClient.prefetchQuery(personExternalOptions(id));

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
      meta: loaderData ? seo(loaderData.seo) : undefined,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: person } = useSuspenseQuery(personDetailsOptions(id));

  return <PersonDetails person={person} />;
}
