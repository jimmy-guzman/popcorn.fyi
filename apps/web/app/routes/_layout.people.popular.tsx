import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PeopleList } from "@/components/people-list";
import { popularPeople } from "@/config/lists";
import { site } from "@/config/site";
import { peoplePopularOptions } from "@/lib/people";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/people/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${popularPeople.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(peoplePopularOptions());
  },
});

function RouteComponent() {
  const { data: people } = useSuspenseQuery(peoplePopularOptions());

  return (
    <div className="p-8">
      <PeopleList
        description={popularPeople.description}
        people={people?.results ?? []}
        title={popularPeople.title}
      />
    </div>
  );
}
