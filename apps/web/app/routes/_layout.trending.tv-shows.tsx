import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { TVShowList } from "@/components/tv-show-list";
import { trendingTVShows } from "@/config/lists";
import { trendingTvFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/trending/tv-shows")({
  component: RouteComponent,
});

function RouteComponent() {
  const getTrendingTvShows = useServerFn(trendingTvFn);

  const { data: tvShows } = useQuery({
    queryFn: () => {
      return getTrendingTvShows();
    },
    queryKey: ["trending/tv"],
  });

  return (
    <div className="p-8">
      <TVShowList
        description={trendingTVShows.description}
        title={trendingTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
