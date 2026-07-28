import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as v from "valibot";

import { Prose } from "@/components/shared/prose";
import { TvSeasonBreadcrumb } from "@/components/tv/tv-season-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tvDetailsOptions } from "@/data/tv/details";
import { tvEpisodeOptions } from "@/data/tv/details.episode";
import { tvSeasonOptions } from "@/data/tv/details.season";
import { orEmpty } from "@/lib/array";
import { date } from "@/lib/date";
import { hasKey } from "@/lib/predicates";
import { tmdbImageUrl } from "@/lib/tmdb-images";
import { EpisodePathParamsSchema } from "@/schemas/path-params";

export const Route = createFileRoute(
  "/_layout/tv-shows/$id/seasons/$season/episodes/$episode",
)({
  component: RouteComponent,
  params: {
    parse: (params) => {
      return v.parse(EpisodePathParamsSchema, params);
    },
  },
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(tvEpisodeOptions(params)),
      context.queryClient.ensureQueryData(
        tvSeasonOptions({ id: params.id, season: params.season }),
      ),
      context.queryClient.ensureQueryData(tvDetailsOptions(params.id)),
    ]);
  },
});

function RouteComponent() {
  const { episode, id, season } = Route.useParams();
  const { data: details } = useSuspenseQuery(
    tvEpisodeOptions({ episode, id, season }),
  );
  const { data: seasonDetails } = useSuspenseQuery(
    tvSeasonOptions({ id, season }),
  );
  const { data: tvShow } = useSuspenseQuery(tvDetailsOptions(id));

  const numbers = orEmpty(seasonDetails.episodes)
    .filter(hasKey("episode_number"))
    .map((item) => {
      return item.episode_number;
    });

  const index = numbers.indexOf(episode);
  const previous = index > 0 ? numbers[index - 1] : undefined;
  const next = index === -1 ? undefined : numbers[index + 1];

  return (
    <section className="flex w-full flex-col gap-8">
      <TvSeasonBreadcrumb
        episodeName={details.name}
        id={id}
        season={season}
        seasonName={seasonDetails.name}
        showName={tvShow.name}
      />
      <Prose>
        <h2>
          <span className="tabular-nums">{details.episode_number}.</span>{" "}
          {details.name}
        </h2>
      </Prose>
      {details.still_path ? (
        <img
          alt={details.name ?? "Episode still"}
          className="aspect-video w-full object-cover"
          decoding="async"
          src={tmdbImageUrl(details.still_path, "w1280")}
        />
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        {typeof details.vote_average === "number" ? (
          <Badge className="tabular-nums" variant="default">
            {details.vote_average.toFixed(1)}
          </Badge>
        ) : null}
        <span className="text-muted-foreground tabular-nums">
          {[
            details.air_date ? date(details.air_date) : undefined,
            details.runtime ? `${details.runtime} min` : undefined,
          ]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </div>
      {details.overview ? (
        <Prose>
          <p>{details.overview}</p>
        </Prose>
      ) : null}
      <nav className="flex flex-wrap items-center justify-between gap-2">
        <Button
          disabled={previous === undefined}
          render={
            previous === undefined ? undefined : (
              <Link
                params={{ episode: previous, id, season }}
                resetScroll={false}
                to="/tv-shows/$id/seasons/$season/episodes/$episode"
              />
            )
          }
          variant="outline"
        >
          <ChevronLeftIcon data-icon="inline-start" />
          Previous Episode
        </Button>
        <Button
          disabled={next === undefined}
          render={
            next === undefined ? undefined : (
              <Link
                params={{ episode: next, id, season }}
                resetScroll={false}
                to="/tv-shows/$id/seasons/$season/episodes/$episode"
              />
            )
          }
          variant="outline"
        >
          Next Episode
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </nav>
    </section>
  );
}
