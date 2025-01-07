import { MovieHero } from "./movie-hero";
import { PersonHero } from "./person-hero";
import { TvShowHero } from "./tv-show-hero";

export const TrendingCarousel = ({
  trending,
}: {
  trending: { id: number; media_type?: string }[];
}) => {
  return (
    <div className="dsy-carousel h-[calc(100vh-68px)] w-full">
      {trending.map((result) => {
        if (result.media_type === "tv") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <TvShowHero tvShow={result} />
            </div>
          );
        }

        if (result.media_type === "movie") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <MovieHero movie={result} />
            </div>
          );
        }

        if (result.media_type === "person") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <PersonHero person={result} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
