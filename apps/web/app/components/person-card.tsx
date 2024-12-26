import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { MediaType } from "./media-type";

interface PersonCardProps {
  person: {
    id: number;
    known_for_department?: string;
    media_type?: string;
    name?: string;
    profile_path?: string;
  };
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Link
      className="dsy-card hover:bg-base-300 shadow-xl hover:mix-blend-plus-lighter"
      key={person.id}
      params={{ id: person.id.toString() }}
      to="/people/$id"
    >
      {person.profile_path ? (
        <figure>
          <img
            alt={person.name}
            src={tmdbImageUrl(person.profile_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <div className="flex justify-end gap-2">
          <MediaType mediaType={person.media_type} />
        </div>
        <h2 className="dsy-card-title">{person.name}</h2>
        <p>Known for {person.known_for_department}</p>
      </div>
    </Link>
  );
};
