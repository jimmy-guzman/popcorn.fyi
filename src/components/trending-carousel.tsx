import { Link } from "@tanstack/react-router";

import { MovieHero } from "./movie/movie-hero";
import { PersonHero } from "./people/person-hero";
import { TvShowHero } from "./tv/tv-show-hero";

interface TrendingCarouselProps {
  trending: { id: number; media_type?: string }[];
}

export const TrendingCarousel = ({ trending }: TrendingCarouselProps) => {
  return (
    <div className="flex h-9/10 flex-col justify-between">
      <div className="dsy-carousel rounded-box h-full">
        {trending.map((result, index) => {
          if (result.media_type === "tv") {
            return (
              <div
                className="dsy-carousel-item w-full"
                id={`${index + 1}`}
                key={result.id}
              >
                <TvShowHero isTrending tvShow={result} />
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
                <MovieHero isTrending movie={result} />
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
            <Link
              aria-label={`Go to slide ${index + 1}`}
              className="dsy-btn dsy-btn-sm dsy-btn-ghost dsy-btn-circle"
              hash={`${index + 1}`}
              hashScrollIntoView={{
                behavior: "instant",
                block: "center",
                inline: "center",
              }}
              key={`${index + 1}`}
              to="."
            >
              <span className="icon-[lucide--dot] h-8 w-8" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
