import { Link } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { CardImageFallback } from "../media/card-image-fallback";
import { MediaRating } from "../media/media-rating";
import { MediaType } from "../media/media-type";

interface PersonCardProps {
  person: {
    id: number;
    known_for_department?: string;
    media_type?: string;
    name?: string;
    popularity?: number;
    profile_path?: string;
  };
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Link aria-label={person.name} params={{ id: person.id }} to="/people/$id">
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
          <CardTitle className="text-base font-medium">{person.name}</CardTitle>
          <CardDescription>
            Known for {person.known_for_department ?? "N/A"}
          </CardDescription>
          <CardAction className="flex gap-2">
            <MediaRating average={person.popularity} />
            <MediaType mediaType={person.media_type} />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
};
