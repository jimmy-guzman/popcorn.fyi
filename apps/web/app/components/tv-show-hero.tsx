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
    <div
      aria-label={tvShow.name}
      className="dsy-hero min-h-screen w-full"
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
            <span className="dsy-badge dsy-badge-accent">Trending</span>
            <span className="dsy-badge dsy-badge-accent">TV Show</span>
          </div>
          <h1 className="mb-5 text-8xl font-bold">{tvShow.name}</h1>
          <p className="mb-5">{tvShow.overview}</p>
          <button className="dsy-btn dsy-btn-primary" disabled type="button">
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
