import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

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
              className="dsy-card hover:bg-base-300 shadow-xl delay-150 hover:scale-105"
              key={person.id}
              params={{ id: person.id.toString() }}
              to="/people/$id"
            >
              {person.profile_path ? (
                <figure>
                  <img
                    alt={person.name}
                    src={tmdbImageUrl(person.profile_path, "w500")}
                  />
                </figure>
              ) : null}
              <div className="dsy-card-body">
                <h2 className="dsy-card-title">{person.name}</h2>
                <p>{person.character}</p>
              </div>
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
              className="dsy-card hover:bg-base-300 shadow-xl delay-150 hover:scale-105"
              key={person.id}
              params={{ id: person.id.toString() }}
              to="/people/$id"
            >
              {person.profile_path ? (
                <figure>
                  <img
                    alt={person.name}
                    src={tmdbImageUrl(person.profile_path, "w500")}
                  />
                </figure>
              ) : null}
              <div className="dsy-card-body">
                <h2 className="dsy-card-title">{person.name}</h2>
                <p>{person.job}</p>
              </div>
            </Link>
          );
        })}
      </ListContent>
    </div>
  );
};
