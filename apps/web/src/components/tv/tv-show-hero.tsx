import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Button } from "@popcorn.fyi/ui/button";
import {
  Hero,
  HeroBadges,
  HeroContent,
  HeroOverlay,
  HeroTitle,
} from "@popcorn.fyi/ui/hero";
import { Link } from "@tanstack/react-router";

import { MediaType } from "../media/media-type";

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
      <HeroContent className="text-neutral-content text-center">
        <div className="flex flex-col items-center gap-5">
          <HeroBadges>
            <MediaType mediaType={tvShow.media_type} />
          </HeroBadges>
          <HeroTitle>{tvShow.name}</HeroTitle>
          <p>{tvShow.overview}</p>
          <Button asChild color="primary">
            <Link params={{ id: tvShow.id }} to="/tv-shows/$id">
              Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
            </Link>
          </Button>
        </div>
      </HeroContent>
    </Hero>
  );
};
