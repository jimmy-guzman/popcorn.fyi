import { tmdbImageUrl } from "@popcorn.fyi/tmdb";

interface MovieHeroProps {
  movie: {
    backdrop_path?: string;
    overview?: string;
    title?: string;
  };
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
  return (
    <div className="dsy-hero bg-base-200">
      <div className="dsy-hero-content flex-col lg:flex-row">
        {movie.backdrop_path ? (
          <img
            alt={movie.title}
            className="max-w-xl rounded-lg shadow-2xl"
            src={tmdbImageUrl(movie.backdrop_path)}
          />
        ) : null}
        <div>
          <div className="flex gap-2">
            <span className="dsy-badge dsy-badge-accent">Trending</span>
            <span className="dsy-badge dsy-badge-accent">Movie</span>
          </div>

          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="py-6">{movie.overview}</p>
          <button className="dsy-btn dsy-btn-primary" type="button">
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
