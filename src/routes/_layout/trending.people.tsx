import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PeopleList } from "@/components/people/people-list";
import { site } from "@/config/site";
import { trendingPeopleOptions } from "@/data/people/trending.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/trending/people")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingPeopleOptions());
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.trending.people.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const { data: people } = useSuspenseQuery(trendingPeopleOptions());

  return (
    <PeopleList
      description={site.pages.trending.people.description}
      people={orEmpty(people.results).filter(hasId)}
      title={site.pages.trending.people.title}
    />
  );
}
