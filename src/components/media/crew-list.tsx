import { Link } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
              <Card className="h-full pt-0 shadow-lg" size="sm">
                {person.profile_path ? (
                  <img
                    alt={person.name ?? ""}
                    className="aspect-2/3 w-full shrink-0 object-cover"
                    src={tmdbImageUrl(person.profile_path, "w500")}
                  />
                ) : (
                  <CardImageFallback />
                )}
                <CardHeader className="gap-2">
                  <CardTitle className="text-base font-medium">
                    {person.name}
                  </CardTitle>
                  <CardDescription>{person.job}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
