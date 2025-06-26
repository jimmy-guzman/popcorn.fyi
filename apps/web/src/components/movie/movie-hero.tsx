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
    <Hero
      aria-label={movie.title}
      backgroundImage={
        movie.backdrop_path ? tmdbImageUrl(movie.backdrop_path) : undefined
      }
    >
      <HeroOverlay />
      <HeroContent className="text-neutral-content text-center">
        <div className="flex flex-col items-center gap-5">
          <HeroBadges>
            {isTrending && <TrendingBadge />}
            <MediaType mediaType={movie.media_type} />
          </HeroBadges>
          <HeroTitle>{movie.title}</HeroTitle>
          <p>{movie.overview}</p>
          <Button asChild color="primary">
            <Link params={{ id: movie.id }} to="/movies/$id">
              Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
            </Link>
          </Button>
        </div>
      </HeroContent>
    </Hero>
  );
};
