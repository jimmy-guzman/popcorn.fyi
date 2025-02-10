import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trendingPeopleOptions } from "@/api/people/trending.list";
import { PeopleList } from "@/components/people/people-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/trending/people")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.trending.people.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingPeopleOptions());
  },
});

function RouteComponent() {
  const { data: people } = useSuspenseQuery(trendingPeopleOptions());

  return (
    <PeopleList
      description={site.pages.trending.people.description}
      people={people.results ?? []}
      title={site.pages.trending.people.title}
    />
  );
}
