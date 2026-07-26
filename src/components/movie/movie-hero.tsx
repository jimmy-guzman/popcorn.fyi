import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MediaBackdropStrip } from "../media/media-backdrop-strip";
import { MediaType } from "../media/media-type";
import { TrendingBadge } from "../media/trending-badge";

interface MovieHeroProps {
  isTrending?: boolean;
  movie: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    overview?: string;
    title?: string;
  };
}

export const MovieHero = ({ isTrending, movie }: MovieHeroProps) => {
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
      <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
        {movie.title}
      </h1>
      <p>{movie.overview}</p>
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
