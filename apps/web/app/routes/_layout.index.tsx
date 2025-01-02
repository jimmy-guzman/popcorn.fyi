import { shuffle } from "@popcorn.fyi/utils";
import { createFileRoute } from "@tanstack/react-router";

import { TrendingCarousel } from "@/components/trending-carousel";
import { trendingAllFn } from "@/lib/trending";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async () => {
    const data = await trendingAllFn();

    return shuffle(data?.results ?? []);
  },
});

function Home() {
  const trending = Route.useLoaderData();

  return <TrendingCarousel trending={trending} />;
}
