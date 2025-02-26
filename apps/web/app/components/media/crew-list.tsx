import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Card, CardContent, CardImage, CardTitle } from "@popcorn.fyi/ui/card";
import { Link } from "@tanstack/react-router";

import { ListContent } from "../shared/list-content";

interface CrewListProps {
  crew: {
    id: number;
    job?: string;
    name?: string;
    profile_path?: string;
  }[];
}

export const CrewList = ({ crew }: CrewListProps) => {
  return (
    <ListContent aria-labelledby="crew">
      {crew.map((person) => {
        return (
          <Link
            aria-label={person.name}
            key={person.job ? `${person.id}_${person.job}` : person.id}
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
                <p>{person.job}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </ListContent>
  );
};
