import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon, TvIcon } from "lucide-react";
import * as v from "valibot";

import { Prose } from "@/components/shared/prose";
import { TvEpisodeCard } from "@/components/tv/tv-episode-card";
import { TvSeasonBreadcrumb } from "@/components/tv/tv-season-breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { tvDetailsOptions } from "@/data/tv/details";
import { tvSeasonOptions } from "@/data/tv/details.season";
import { orEmpty } from "@/lib/array";
import { hasKey } from "@/lib/predicates";
import { SeasonPathParamsSchema } from "@/schemas/path-params";

export const Route = createFileRoute("/_layout/tv-shows/$id/seasons/$season/")({
  component: RouteComponent,
  params: {
    parse: (params) => {
      return v.parse(SeasonPathParamsSchema, params);
    },
  },
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(tvSeasonOptions(params)),
      context.queryClient.ensureQueryData(tvDetailsOptions(params.id)),
    ]);
  },
});

function RouteComponent() {
  const { id, season } = Route.useParams();
  const { data: seasonDetails } = useSuspenseQuery(
    tvSeasonOptions({ id, season }),
  );
  const { data: tvShow } = useSuspenseQuery(tvDetailsOptions(id));

  const episodes = orEmpty(seasonDetails.episodes).filter(
    hasKey("episode_number"),
  );

  const seasonNumbers = orEmpty(tvShow.seasons)
    .filter(hasKey("season_number"))
    .map((item) => {
      return item.season_number;
    });
  const index = seasonNumbers.indexOf(season);
  const previous = index > 0 ? seasonNumbers[index - 1] : undefined;
  const next = index === -1 ? undefined : seasonNumbers[index + 1];

  return (
    <section className="flex w-full flex-col gap-8">
      <TvSeasonBreadcrumb
        id={id}
        season={season}
        seasonName={seasonDetails.name}
        showName={tvShow.name}
      />
      <Prose>
        <h2>{seasonDetails.name}</h2>
        {seasonDetails.overview ? <p>{seasonDetails.overview}</p> : null}
      </Prose>
      {episodes.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {episodes.map((episode) => {
            return (
              <li key={episode.episode_number}>
                <TvEpisodeCard episode={episode} id={id} season={season} />
              </li>
            );
          })}
        </ul>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TvIcon />
            </EmptyMedia>
            <EmptyTitle>No episodes yet</EmptyTitle>
            <EmptyDescription>
              TMDB has no episodes listed for this season.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      <nav className="flex flex-wrap items-center justify-between gap-2">
        <Button
          disabled={previous === undefined}
          render={
            previous === undefined ? undefined : (
              <Link
                params={{ id, season: previous }}
                resetScroll={false}
                to="/tv-shows/$id/seasons/$season"
              />
            )
          }
          variant="outline"
        >
          <ChevronLeftIcon data-icon="inline-start" />
          Previous Season
        </Button>
        <Button
          disabled={next === undefined}
          render={
            next === undefined ? undefined : (
              <Link
                params={{ id, season: next }}
                resetScroll={false}
                to="/tv-shows/$id/seasons/$season"
              />
            )
          }
          variant="outline"
        >
          Next Season
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </nav>
    </section>
  );
}
