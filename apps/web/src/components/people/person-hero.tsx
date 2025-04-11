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
      <HeroContent className="text-neutral-content text-center">
        <div className="flex flex-col items-center gap-5">
          <HeroBadges>
            <MediaType mediaType={person.media_type} />
          </HeroBadges>
          <HeroTitle>{person.name}</HeroTitle>
          <p>Known for {person.known_for_department}</p>
          <Button asChild color="primary">
            <Link params={{ id: person.id.toString() }} to="/tv-shows/$id">
              Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
            </Link>
          </Button>
        </div>
      </HeroContent>
    </Hero>
  );
};
