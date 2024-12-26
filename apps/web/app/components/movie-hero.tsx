import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { MediaType } from "./media-type";

interface MovieHeroProps {
  movie: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    overview?: string;
    title?: string;
  };
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  return (
    <div
      aria-label={movie.title}
      className="dsy-hero min-h-screen w-full"
      role={movie.backdrop_path ? "img" : undefined}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${tmdbImageUrl(movie.backdrop_path)})`
          : undefined,
      }}
    >
      <div className="dsy-hero-overlay bg-opacity-60" />
      <div className="dsy-hero-content text-neutral-content text-center">
        <div>
          <div className="flex justify-end gap-2">
            <MediaType mediaType={movie.media_type} />
          </div>
          <h1 className="mb-5 text-pretty text-6xl font-bold lg:text-8xl">
            {movie.title}
          </h1>
          <p className="mb-5">{movie.overview}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: movie.id.toString() }}
            to="/movies/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
