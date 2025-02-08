import { createFileRoute } from "@tanstack/react-router";

import { favoritePeopleFn } from "@/api/favorites";
import { PeopleList } from "@/components/people/people-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/favorites/people")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.favorites.people.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    const data = await favoritePeopleFn({ data: context.userId });

    return data;
  },
});

function RouteComponent() {
  const favorites = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <PeopleList
        description={site.pages.favorites.people.description}
        people={favorites}
        title={site.pages.favorites.people.title}
      />
    </div>
  );
}
