import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MediaBackdropStrip } from "../media/media-backdrop-strip";
import { MediaType } from "../media/media-type";
import { TrendingBadge } from "../media/trending-badge";

interface TVShowHeroProps {
  isTrending?: boolean;
  tvShow: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    name?: string;
    overview?: string;
  };
}

export const TvShowHero = ({ isTrending, tvShow }: TVShowHeroProps) => {
  return (
    <MediaBackdropStrip
      aria-label={tvShow.name}
      backdropPath={tvShow.backdrop_path}
      role={tvShow.backdrop_path ? "img" : undefined}
    >
      <div className="flex w-full justify-end gap-2">
        {isTrending && <TrendingBadge />}
        <MediaType mediaType={tvShow.media_type} />
      </div>
      <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
        {tvShow.name}
      </h1>
      <p>{tvShow.overview}</p>
      <Button
        className="gap-2"
        nativeButton={false}
        render={
          <Link params={{ id: tvShow.id }} to="/tv-shows/$id">
            Details <ArrowRightIcon className="size-4" />
          </Link>
        }
      />
    </MediaBackdropStrip>
  );
};
