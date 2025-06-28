import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/api-clients/urls";

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
    <div
      aria-label={person.name}
      className="dsy-hero w-full"
      role="img"
      style={{
        backgroundImage: person.backdrop_path
          ? `url(${tmdbImageUrl(person.backdrop_path)})`
          : undefined,
      }}
    >
      <div className="dsy-hero-overlay bg-opacity-60" />
      <div className="dsy-hero-content text-neutral-content text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full justify-end gap-2">
            <MediaType mediaType={person.media_type} />
          </div>
          <h1 className="text-pretty text-5xl font-bold lg:text-7xl">
            {person.name}
          </h1>
          <p>Known for {person.known_for_department}</p>
          <Link
            className="dsy-btn dsy-btn-primary"
            params={{ id: person.id }}
            to="/tv-shows/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};
