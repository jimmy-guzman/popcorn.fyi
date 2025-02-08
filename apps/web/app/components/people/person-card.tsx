import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Card, CardContent, CardImage, CardTitle } from "@popcorn.fyi/ui/card";
import { Link } from "@tanstack/react-router";

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
          <div className="flex justify-end gap-2">
            <MediaType mediaType={person.media_type} />
          </div>
          <CardTitle>{person.name}</CardTitle>
          <p>Known for {person.known_for_department}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
