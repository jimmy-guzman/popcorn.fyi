import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { Hero, HeroBadges, HeroContent, HeroOverlay, HeroTitle } from "./hero";
import { MediaType } from "./media-type";

interface PersonHeroProps {
  person: {
    backdrop_path?: string;
    id: number;
    known_for_department?: string;
    media_type?: string;
    name?: string;
  };
}

export const PersonHero = ({ person }: PersonHeroProps) => {
  return (
    <Hero
      aria-label={person.name}
      backgroundImage={
        person.backdrop_path ? tmdbImageUrl(person.backdrop_path) : undefined
      }
    >
      <HeroOverlay />
      <HeroContent>
        <HeroBadges>
          <MediaType mediaType={person.media_type} />
        </HeroBadges>
        <HeroTitle>{person.name}</HeroTitle>
        <p>Known for {person.known_for_department}</p>
        <Link
          className="dsy-btn dsy-btn-primary"
          params={{ id: person.id.toString() }}
          to="/tv-shows/$id"
        >
          Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
        </Link>
      </HeroContent>
    </Hero>
  );
};
