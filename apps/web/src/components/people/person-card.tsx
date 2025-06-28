import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Link } from "@tanstack/react-router";

import { CardImageFallback } from "../media/card-image-fallback";
import { MediaType } from "../media/media-type";

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
    <Link key={person.id} params={{ id: person.id }} to="/people/$id">
      <div className="dsy-card dsy-card-sm md:dsy-card-normal h-full shadow-xl">
        {person.profile_path ? (
          <figure>
            <img
              alt={person.name}
              src={tmdbImageUrl(person.profile_path, "w500")}
            />
          </figure>
        ) : (
          <CardImageFallback />
        )}
        <div>
          <div className="flex justify-end gap-2">
            <MediaType mediaType={person.media_type} />
          </div>
          <h2 className="dsy-card-title">{person.name}</h2>
          <p>Known for {person.known_for_department}</p>
        </div>
      </div>
    </Link>
  );
};
