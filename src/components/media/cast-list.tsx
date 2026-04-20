import { Link } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tmdbImageUrl } from "@/lib/tmdb-images";

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
    <ul
      aria-labelledby="cast"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {cast.map((person) => {
        const name = person.name ?? "Unknown";
        const character = person.character ?? "—";

        return (
          <li key={person.id}>
            <Link aria-label={name} params={{ id: person.id }} to="/people/$id">
              <Card className="h-full pt-0 shadow-lg" size="sm">
                {person.profile_path ? (
                  <img
                    alt={name}
                    className="aspect-2/3 w-full shrink-0 object-cover"
                    decoding="async"
                    loading="lazy"
                    src={tmdbImageUrl(person.profile_path, "w500")}
                  />
                ) : (
                  <CardImageFallback />
                )}
                <CardHeader className="gap-2">
                  <CardTitle className="text-base font-medium">
                    {name}
                  </CardTitle>
                  <CardDescription>{character}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
