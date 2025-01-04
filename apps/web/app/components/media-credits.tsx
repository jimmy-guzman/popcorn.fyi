import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

import { Card, CardContent, CardImage, CardTitle } from "./card";
import { ListContent } from "./list-content";
import { Prose } from "./prose";

interface MediaCreditsProps {
  credits: {
    cast?: {
      character?: string;
      id: number;
      name?: string;
      profile_path?: string;
    }[];
    crew?: {
      id: number;
      job?: string;
      name?: string;
      profile_path?: string;
    }[];
  };
}

export const MediaCredits = ({ credits }: MediaCreditsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Prose>
        <h2 id="cast">Cast</h2>
      </Prose>
      <ListContent>
        {credits.cast?.map((person) => {
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
      <div className="dsy-divider" />
      <Prose>
        <h2 id="crew">Crew</h2>
      </Prose>
      <ListContent>
        {credits.crew?.map((person) => {
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
                  <p>{person.job}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </ListContent>
    </div>
  );
};
