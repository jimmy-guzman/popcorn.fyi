import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/tmdb-images";

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
    <div
      aria-label={tvShow.name}
      className="dsy-hero w-full"
      role={tvShow.backdrop_path ? "img" : undefined}
      style={{
        backgroundImage: tvShow.backdrop_path
          ? `url(${tmdbImageUrl(tvShow.backdrop_path)})`
          : undefined,
      }}
    >
      <div className="bg-opacity-60 dsy-hero-overlay" />
      <div className="dsy-hero-content text-center text-neutral-content">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full justify-end gap-2">
            {isTrending && <TrendingBadge />}
            <MediaType mediaType={tvShow.media_type} />
          </div>
          <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
            {tvShow.name}
          </h1>
          <p>{tvShow.overview}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: tvShow.id }}
            to="/tv-shows/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
