import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/list-pagination";
import { PeopleList } from "@/components/people-list";
import { site } from "@/config/site";
import { peoplePopularOptions } from "@/lib/people";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/lists";

export const Route = createFileRoute("/_layout/people/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularPeople.title} | ${site.title}`,
      }),
    };
  },
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(peoplePopularOptions(deps));
  },
  validateSearch: PaginationSchema,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: people } = useSuspenseQuery(peoplePopularOptions(search));

  return (
    <div className="flex flex-col gap-4 p-8">
      <PeopleList
        description={site.pages.popularPeople.description}
        people={people?.results ?? []}
        title={site.pages.popularPeople.title}
      />
      {people ? (
        <ListPagination page={people.page} totalPages={people.total_pages} />
      ) : null}
    </div>
  );
}
