import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trendingAllOptions } from "@/api/trending.list";
import { TrendingCarousel } from "@/components/trending-carousel";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingAllOptions());
  },
});

function Home() {
  const { data: trending } = useSuspenseQuery(trendingAllOptions());

  return (
    <section className="h-screen">
      <TrendingCarousel trending={trending} />
    </section>
  );
}
