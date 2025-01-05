import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { Card, CardContent, CardImage, CardTitle } from "./card";
import { ListContent } from "./list-content";

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
            key={person.id}
            params={{ id: person.id.toString() }}
            to="/people/$id"
          >
            <Card>
              {person.profile_path ? (
                <CardImage
                  alt={person.name}
                  src={tmdbImageUrl(person.profile_path, "w500")}
                />
              ) : null}
              <CardContent>
                <CardTitle>{person.name}</CardTitle>
                <p>{person.character}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </ListContent>
  );
};
