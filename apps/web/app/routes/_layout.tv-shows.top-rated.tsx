import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { TVShowList } from "@/components/tv-show-list";
import { topRatedTVShows } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { topRatedTvFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/tv-shows/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${topRatedTVShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const getTopRatedTvShows = useServerFn(topRatedTvFn);

  const { data: tvShows } = useQuery({
    queryFn: () => {
      return getTopRatedTvShows();
    },
    queryKey: ["tv/top-rated"],
  });

  return (
    <div className="p-8">
      <TVShowList
        description={topRatedTVShows.description}
        title={topRatedTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
