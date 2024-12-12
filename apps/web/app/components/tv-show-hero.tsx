import { tmdbImageUrl } from "@popcorn.fyi/tmdb";

interface TVShowHeroProps {
  tvShow: {
    backdrop_path?: string;
    name?: string;
    overview?: string;
  };
}

export const TvShowHero = ({ tvShow }: TVShowHeroProps) => {
  return (
    <div className="dsy-hero bg-base-200">
      <div className="dsy-hero-content flex-col lg:flex-row">
        {tvShow.backdrop_path ? (
          <img
            alt={tvShow.name}
            className="max-w-xl rounded-lg shadow-2xl"
            src={tmdbImageUrl(tvShow.backdrop_path)}
          />
        ) : null}
        <div>
          <div className="flex gap-2">
            <span className="dsy-badge dsy-badge-accent">Trending</span>
            <span className="dsy-badge dsy-badge-accent">TV Show</span>
          </div>

          <h1 className="text-5xl font-bold">{tvShow.name}</h1>
          <p className="py-6">{tvShow.overview}</p>
          <button className="dsy-btn dsy-btn-primary" type="button">
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
