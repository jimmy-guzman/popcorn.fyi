import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { PeopleList } from "@/components/people-list";
import { popularPeople } from "@/config/lists";
import { popularPeopleFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/people/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  const getPopularPeople = useServerFn(popularPeopleFn);

  const { data: people } = useQuery({
    queryFn: () => {
      return getPopularPeople();
    },
    queryKey: ["people/popular"],
  });

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
