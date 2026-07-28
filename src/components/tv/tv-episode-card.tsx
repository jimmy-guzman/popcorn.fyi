import { Link } from "@tanstack/react-router";

import { CardImageFallback } from "@/components/media/card-image-fallback";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { date } from "@/lib/date";
import { tmdbImageUrl } from "@/lib/tmdb-images";

interface TvEpisodeCardProps {
  episode: {
    air_date?: string;
    episode_number: number;
    name?: string;
    overview?: string;
    runtime?: number;
    still_path?: string;
    vote_average?: number;
  };
  id: number;
  season: number;
}

export const TvEpisodeCard = ({ episode, id, season }: TvEpisodeCardProps) => {
  const meta = [
    episode.air_date ? date(episode.air_date) : undefined,
    episode.runtime ? `${episode.runtime} min` : undefined,
  ].filter(Boolean);

  return (
    <Link
      aria-label={episode.name}
      params={{ episode: episode.episode_number, id, season }}
      to="/tv-shows/$id/seasons/$season/episodes/$episode"
    >
      <Card
        className="h-full overflow-hidden shadow-lg data-[size=sm]:py-0 md:flex-row"
        size="sm"
      >
        <div className="shrink-0 md:w-64">
          {episode.still_path ? (
            <img
              alt={episode.name ?? "Episode still"}
              className="aspect-video w-full object-cover"
              decoding="async"
              loading="lazy"
              src={tmdbImageUrl(episode.still_path, "w500")}
            />
          ) : (
            <CardImageFallback className="aspect-video" />
          )}
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 py-3">
          <h3 className="font-heading text-base font-medium">
            <span className="tabular-nums">{episode.episode_number}.</span>{" "}
            {episode.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {typeof episode.vote_average === "number" ? (
              <Badge className="tabular-nums" variant="default">
                {episode.vote_average.toFixed(1)}
              </Badge>
            ) : null}
            {meta.length > 0 ? (
              <span className="text-muted-foreground tabular-nums">
                {meta.join(" · ")}
              </span>
            ) : null}
          </div>
          {episode.overview ? (
            <p className="line-clamp-3 text-muted-foreground">
              {episode.overview}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
};
