import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { peoplePopularOptions } from "@/api/people/popular.list";
import { PeopleList } from "@/components/people/people-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/people/popular")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(peoplePopularOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popular.people.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: people } = useSuspenseQuery(peoplePopularOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <PeopleList
        description={site.pages.popular.people.description}
        people={people.results ?? []}
        title={site.pages.popular.people.title}
      />
      <ListPagination page={people.page} totalPages={people.total_pages} />
    </div>
  );
}
