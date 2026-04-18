import { Link } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { CardImageFallback } from "./card-image-fallback";

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
    <ul
      aria-labelledby="crew"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {crew.map((person) => {
        return (
          <li key={person.id}>
            <Link
              aria-label={person.name}
              params={{ id: person.id }}
              to="/people/$id"
            >
              <Card className="h-full shadow-lg" size="sm">
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
                <CardContent className="flex flex-col gap-2 pt-0">
                  <h2 className="font-heading text-base font-medium">
                    {person.name}
                  </h2>
                  <p>{person.job}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
