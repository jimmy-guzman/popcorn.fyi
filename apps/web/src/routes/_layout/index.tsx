import { shuffle } from "@popcorn.fyi/utils";
import { createFileRoute } from "@tanstack/react-router";

import { trendingAllFn } from "@/api/trending.list";
import { TrendingCarousel } from "@/components/trending-carousel";

const TRENDING_PREVIEW_LIMIT = 5;

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async () => {
    const data = await trendingAllFn();

    return shuffle(data.results ?? []).slice(0, TRENDING_PREVIEW_LIMIT);
  },
  staleTime: Infinity,
});

function Home() {
  const trending = Route.useLoaderData();

  return (
    <section className="h-screen">
      <TrendingCarousel trending={trending} />
    </section>
  );
}
