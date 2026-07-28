import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TvIcon } from "lucide-react";

import { CardImageFallback } from "@/components/media/card-image-fallback";
import { Prose } from "@/components/shared/prose";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { tvDetailsOptions } from "@/data/tv/details";
import { orEmpty } from "@/lib/array";
import { year } from "@/lib/date";
import { hasKey } from "@/lib/predicates";
import { tmdbImageUrl } from "@/lib/tmdb-images";

export const Route = createFileRoute("/_layout/tv-shows/$id/seasons/")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(tvDetailsOptions(id));
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: tvShow } = useSuspenseQuery(tvDetailsOptions(id));
  const seasons = orEmpty(tvShow.seasons).filter(hasKey("season_number"));

  if (seasons.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TvIcon />
          </EmptyMedia>
          <EmptyTitle>No seasons yet</EmptyTitle>
          <EmptyDescription>
            TMDB has no season information for this TV show.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section className="flex w-full flex-col gap-8">
      <Prose>
        <h2>Seasons</h2>
      </Prose>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {seasons.map((season) => {
          return (
            <li key={season.season_number}>
              <Link
                aria-label={season.name}
                params={{ id, season: season.season_number }}
                to="/tv-shows/$id/seasons/$season"
              >
                <Card className="h-full pt-0 shadow-lg" size="sm">
                  {season.poster_path ? (
                    <img
                      alt={season.name ?? "Season"}
                      className="aspect-2/3 w-full shrink-0 object-cover"
                      decoding="async"
                      loading="lazy"
                      src={tmdbImageUrl(season.poster_path, "w500")}
                    />
                  ) : (
                    <CardImageFallback />
                  )}
                  <CardHeader className="gap-2">
                    <CardTitle className="text-base font-medium">
                      {season.name}
                    </CardTitle>
                    <CardDescription className="tabular-nums">
                      {[
                        season.air_date ? year(season.air_date) : undefined,
                        season.episode_count
                          ? `${season.episode_count} episodes`
                          : undefined,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
