import { createFileRoute } from "@tanstack/react-router";

import { PeopleList } from "@/components/people-list";
import { site } from "@/config/site";
import { favoritePeopleFn } from "@/lib/favorites";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/favorites/people")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.favoritePeople.title} | ${site.title}`,
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
    <div className="flex flex-col gap-4 p-8">
      <PeopleList
        description={site.pages.favoritePeople.description}
        people={favorites}
        title={site.pages.favoritePeople.title}
      />
    </div>
  );
}
