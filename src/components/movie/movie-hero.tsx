import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/api-clients/urls";

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
    <div
      aria-label={movie.title}
      className="dsy-hero w-full"
      role={movie.backdrop_path ? "img" : undefined}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${tmdbImageUrl(movie.backdrop_path)})`
          : undefined,
      }}
    >
      <div className="dsy-hero-overlay bg-opacity-60" />
      <div className="dsy-hero-content text-neutral-content text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full justify-end gap-2">
            {isTrending && <TrendingBadge />}
            <MediaType mediaType={movie.media_type} />
          </div>
          <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
            {movie.title}
          </h1>
          <p>{movie.overview}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: movie.id }}
            to="/movies/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
