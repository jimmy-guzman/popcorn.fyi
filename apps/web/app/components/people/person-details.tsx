import { tmdbContent, tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Badge } from "@popcorn.fyi/ui/badge";
import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent } from "@popcorn.fyi/ui/hero";
import { date } from "@popcorn.fyi/utils";
import { Outlet } from "@tanstack/react-router";

import { MediaRating } from "../media/media-rating";
import { Favorite } from "../shared/favorite";
import { Prose } from "../shared/prose";

interface PersonDetailsProps {
  person: {
    biography?: string;
    birthday?: string;
    favorite: boolean;
    id: number;
    known_for_department?: string;
    name?: string;
    place_of_birth?: string;
    popularity: number;
    profile_path?: string;
  };
  wikipediaUrl?: string | undefined;
}

export const PersonDetails = ({ person, wikipediaUrl }: PersonDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <Hero>
        <HeroContent className="flex-col items-start gap-4 lg:flex-row">
          {person.profile_path ? (
            <img
              alt={person.name}
              className="w-full rounded-lg shadow-2xl md:hidden md:w-auto md:max-w-xs lg:block"
              src={tmdbImageUrl(person.profile_path, "w500")}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
              <MediaRating average={person.popularity} />
              <Badge color="neutral">
                {person.known_for_department ?? "N/A"}
              </Badge>
            </div>
            <Prose size="lg">
              <h1>{person.name}</h1>
              {person.birthday ? (
                <p>
                  {date(person.birthday)} - {person.place_of_birth}
                </p>
              ) : (
                <p>No birthday available.</p>
              )}
              {person.biography ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: tmdbContent(person.biography),
                  }}
                />
              ) : (
                <p>No biography available.</p>
              )}
            </Prose>
            <div className="flex justify-center gap-4 md:justify-start">
              {wikipediaUrl ? (
                <Button asChild color="primary">
                  <a href={wikipediaUrl} rel="noreferrer" target="_blank">
                    <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
                    <span className="icon-[simple-icons--wikipedia] h-5 w-5" />
                  </a>
                </Button>
              ) : null}
              <Favorite
                favorite={person.favorite}
                mediaType="person"
                tmdbId={person.id}
              />
            </div>
          </div>
        </HeroContent>
      </Hero>
      <Outlet />
    </div>
  );
};
