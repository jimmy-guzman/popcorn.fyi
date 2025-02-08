import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PeopleList } from "@/components/people/people-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { peoplePopularOptions } from "@/lib/people";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/people/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularPeople.title} | ${site.title}`,
      }),
    };
  },
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(peoplePopularOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: people } = useSuspenseQuery(peoplePopularOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <PeopleList
        description={site.pages.popularPeople.description}
        people={people.results ?? []}
        title={site.pages.popularPeople.title}
      />
      <ListPagination page={people.page} totalPages={people.total_pages} />
    </div>
  );
}
