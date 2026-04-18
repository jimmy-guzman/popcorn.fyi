import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TrendingCarousel } from "@/components/trending-carousel";
import { trendingAllOptions } from "@/data/trending.list";
import { hasId } from "@/lib/predicates";

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
      <TrendingCarousel trending={trending.filter(hasId)} />
    </section>
  );
}
