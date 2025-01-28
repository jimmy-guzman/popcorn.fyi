import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Button } from "@popcorn.fyi/ui/button";
import {
  Hero,
  HeroBadges,
  HeroContent,
  HeroOverlay,
  HeroTitle,
} from "@popcorn.fyi/ui/hero";
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
    <Hero
      aria-label={movie.title}
      backgroundImage={
        movie.backdrop_path ? tmdbImageUrl(movie.backdrop_path) : undefined
      }
    >
      <HeroOverlay />
      <HeroContent>
        <HeroBadges>
          <MediaType mediaType={movie.media_type} />
        </HeroBadges>
        <HeroTitle>{movie.title}</HeroTitle>
        <p>{movie.overview}</p>
        <Button asChild color="primary">
          <Link params={{ id: movie.id.toString() }} to="/movies/$id">
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </Button>
      </HeroContent>
    </Hero>
  );
};
