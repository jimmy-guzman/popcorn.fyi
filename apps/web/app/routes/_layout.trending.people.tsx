import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PeopleList } from "@/components/people-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { trendingPeopleOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/trending/people")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.trendingPeople.title} | ${site.title}`,
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
    <div className="p-8">
      <PeopleList
        description={site.pages.trendingPeople.description}
        people={people?.results ?? []}
        title={site.pages.trendingPeople.title}
      />
    </div>
  );
}
