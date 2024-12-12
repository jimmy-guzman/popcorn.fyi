import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { TVShowList } from "@/components/tv-show-list";
import { popularTVShows } from "@/config/lists";
import { popularTvFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/tv-shows/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  const getPopularTv = useServerFn(popularTvFn);

  const { data: tvShows } = useQuery({
    queryFn: () => {
      return getPopularTv();
    },
    queryKey: ["tv/popular"],
  });

  return (
    <div className="p-8">
      <TVShowList
        description={popularTVShows.description}
        title={popularTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
