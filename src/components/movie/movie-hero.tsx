import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { MediaBackdropStrip } from "../media/media-backdrop-strip";
import { MediaGenres } from "../media/media-genres";
import { MediaType } from "../media/media-type";
import { TrendingBadge } from "../media/trending-badge";

interface MovieHeroProps {
  genres?: { id: number; name?: string }[];
  isTrending?: boolean;
  logo?: { filePath?: string };
  movie: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    overview?: string;
    title?: string;
  };
}

export const MovieHero = ({
  genres,
  isTrending,
  logo,
  movie,
}: MovieHeroProps) => {
  return (
    <MediaBackdropStrip
      aria-label={movie.title}
      backdropPath={movie.backdrop_path}
      role={movie.backdrop_path ? "img" : undefined}
    >
      <div className="flex w-full justify-end gap-2">
        {isTrending && <TrendingBadge />}
        <MediaType mediaType={movie.media_type} />
      </div>
      {logo?.filePath ? (
        <h1 className="flex h-24 items-center lg:h-32">
          <img
            alt=""
            aria-hidden
            className="max-h-full w-auto object-contain drop-shadow-lg"
            src={tmdbImageUrl(logo.filePath, "w500")}
          />
          <span className="sr-only">{movie.title}</span>
        </h1>
      ) : (
        <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
          {movie.title}
        </h1>
      )}
      <p>{movie.overview}</p>
      {genres && genres.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2">
          <MediaGenres genres={genres} media="movies" />
        </div>
      ) : null}
      <Button
        className="gap-2"
        nativeButton={false}
        render={
          <Link params={{ id: movie.id }} to="/movies/$id">
            Details <ArrowRightIcon className="size-4" />
          </Link>
        }
      />
    </MediaBackdropStrip>
  );
};
