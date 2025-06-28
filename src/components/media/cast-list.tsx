import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/api-clients/urls";

import { ListContent } from "../shared/list-content";
import { CardImageFallback } from "./card-image-fallback";

interface CastListProps {
  cast: {
    character?: string;
    id: number;
    name?: string;
    profile_path?: string;
  }[];
}

export const CastList = ({ cast }: CastListProps) => {
  return (
    <ListContent aria-labelledby="cast">
      {cast.map((person) => {
        return (
          <Link
            aria-label={person.name}
            key={person.id}
            params={{ id: person.id }}
            to="/people/$id"
          >
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
              <div className="dsy-card-body">
                <h2 className="dsy-card-title">{person.name}</h2>
                <p>{person.character}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </ListContent>
  );
};
