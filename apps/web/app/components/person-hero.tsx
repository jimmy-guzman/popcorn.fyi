import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

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
    <div
      aria-label={person.name}
      className="dsy-hero min-h-screen w-full"
      role={person.backdrop_path ? "img" : undefined}
      style={{
        backgroundImage: person.backdrop_path
          ? `url(${tmdbImageUrl(person.backdrop_path)})`
          : undefined,
      }}
    >
      <div className="dsy-hero-overlay bg-opacity-60" />
      <div className="dsy-hero-content text-neutral-content text-center">
        <div>
          <div className="flex justify-end gap-2">
            <MediaType mediaType={person.media_type} />
          </div>
          <h1 className="mb-5 text-pretty text-6xl font-bold lg:text-8xl">
            {person.name}
          </h1>
          <p className="mb-5">Known for {person.known_for_department}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: person.id.toString() }}
            to="/tv-shows/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
