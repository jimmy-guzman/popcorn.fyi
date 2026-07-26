import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MediaBackdropStrip } from "../media/media-backdrop-strip";
import { MediaType } from "../media/media-type";

interface PersonHeroProps {
  person: {
    backdrop_path?: string;
    id: number;
    known_for_department?: string;
    media_type?: string;
    name?: string;
  };
}

export const PersonHero = ({ person }: PersonHeroProps) => {
  return (
    <MediaBackdropStrip
      aria-label={person.name}
      backdropPath={person.backdrop_path}
      role={person.backdrop_path ? "img" : undefined}
    >
      <div className="flex w-full justify-end gap-2">
        <MediaType mediaType={person.media_type} />
      </div>
      <h1 className="text-5xl font-bold text-pretty lg:text-7xl">
        {person.name}
      </h1>
      <p>Known for {person.known_for_department}</p>
      <Button
        className="gap-2"
        nativeButton={false}
        render={
          <Link params={{ id: person.id }} to="/people/$id">
            Details <ArrowRightIcon className="size-4" />
          </Link>
        }
      />
    </MediaBackdropStrip>
  );
};
