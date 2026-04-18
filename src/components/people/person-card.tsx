import { Link } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
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
          <div className="flex justify-end gap-2">
            <MediaRating average={person.popularity} />
            <MediaType mediaType={person.media_type} />
          </div>
          <h2 className="font-heading text-base font-medium">{person.name}</h2>
          <p>Known for {person.known_for_department ?? "N/A"}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
