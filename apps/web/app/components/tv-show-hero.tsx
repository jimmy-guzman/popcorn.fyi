import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { MediaType } from "./media-type";

interface TVShowHeroProps {
  tvShow: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    name?: string;
    overview?: string;
  };
}

export const TvShowHero = ({ tvShow }: TVShowHeroProps) => {
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
      <div className="dsy-hero-overlay bg-opacity-60" />
      <div className="dsy-hero-content text-neutral-content text-center">
        <div>
          <div className="flex justify-end gap-2">
            <MediaType mediaType={tvShow.media_type} />
          </div>
          <h1 className="mb-5 text-pretty text-6xl font-bold lg:text-8xl">
            {tvShow.name}
          </h1>
          <p className="mb-5">{tvShow.overview}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: tvShow.id.toString() }}
            to="/tv-shows/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
