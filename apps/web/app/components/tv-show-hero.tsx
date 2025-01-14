import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { Hero, HeroBadges, HeroContent, HeroOverlay, HeroTitle } from "./hero";
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
    <Hero
      aria-label={tvShow.name}
      backgroundImage={
        tvShow.backdrop_path ? tmdbImageUrl(tvShow.backdrop_path) : undefined
      }
    >
      <HeroOverlay />
      <HeroContent>
        <HeroBadges>
          <MediaType mediaType={tvShow.media_type} />
        </HeroBadges>
        <HeroTitle>{tvShow.name}</HeroTitle>
        <p>{tvShow.overview}</p>
        <Link
          className="dsy-btn dsy-btn-primary"
          params={{ id: tvShow.id.toString() }}
          to="/tv-shows/$id"
        >
          Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
        </Link>
      </HeroContent>
    </Hero>
  );
};
