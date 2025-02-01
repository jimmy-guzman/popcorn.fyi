import { Button } from "@popcorn.fyi/ui/button";
import { Link } from "@tanstack/react-router";

import { MovieHero } from "./movie-hero";
import { PersonHero } from "./person-hero";
import { TvShowHero } from "./tv-show-hero";

interface TrendingCarouselProps {
  trending: { id: number; media_type?: string }[];
}

export const TrendingCarousel = ({ trending }: TrendingCarouselProps) => {
  return (
    <div className="h-9/10 flex flex-col justify-between">
      <div className="dsy-carousel rounded-box h-full">
        {trending.map((result, index) => {
          if (result.media_type === "tv") {
            return (
              <div
                className="dsy-carousel-item w-full"
                id={`${index + 1}`}
                key={result.id}
              >
                <TvShowHero tvShow={result} />
              </div>
            );
          }

          if (result.media_type === "movie") {
            return (
              <div
                className="dsy-carousel-item w-full"
                id={`${index + 1}`}
                key={result.id}
              >
                <MovieHero movie={result} />
              </div>
            );
          }

          return (
            <div
              className="dsy-carousel-item w-full"
              id={`${index + 1}`}
              key={result.id}
            >
              <PersonHero person={result} />
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {trending.map((_media, index) => {
          return (
            <Button asChild key={`${index + 1}`} size="xs">
              <Link
                hash={`${index + 1}`}
                hashScrollIntoView={{
                  behavior: "instant",
                  block: "center",
                  inline: "center",
                }}
                to="."
              >
                {`${index + 1}`}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
