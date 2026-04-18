import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { date } from "@/lib/date";
import {
  routeTabLinkActiveClassName,
  routeTabLinkClassName,
  routeTabListClassName,
} from "@/lib/styles/route-ui";
import { tmdbContent } from "@/lib/tmdb-content";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { MediaRating } from "../media/media-rating";
import { Prose } from "../shared/prose";
import { ShareButton } from "../shared/share-button";
import { WikipediaButton } from "./wikipedia-button";

interface PersonDetailsProps {
  person: {
    biography?: string;
    birthday?: string;
    id?: number;
    known_for_department?: string;
    name?: string;
    place_of_birth?: string;
    popularity?: number;
    profile_path?: string;
  };
}

export const PersonDetails = ({ person }: PersonDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
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
            <Badge variant="secondary">
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
                // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- TODO: Remove this line when eslint config is fixed
                dangerouslySetInnerHTML={{
                  __html: tmdbContent(person.biography),
                }}
              />
            ) : (
              <p>No biography available.</p>
            )}
          </Prose>
          <div className="flex justify-center gap-2 md:justify-start">
            {person.id ? (
              <Suspense
                fallback={<Skeleton className="h-10 w-10 rounded md:w-32" />}
              >
                <WikipediaButton id={person.id} />
              </Suspense>
            ) : null}
            {person.name ? (
              <ShareButton title={person.name} url={`/people/${person.id}`} />
            ) : null}
          </div>
        </div>
      </div>
      {person.id ? (
        <div className={routeTabListClassName} role="tablist">
          <Link
            activeOptions={{ exact: true }}
            activeProps={{ className: routeTabLinkActiveClassName }}
            className={routeTabLinkClassName}
            hash="known-for"
            params={{ id: person.id }}
            role="tab"
            to="/people/$id"
          >
            Known For
          </Link>
          <Link
            activeProps={{ className: routeTabLinkActiveClassName }}
            className={routeTabLinkClassName}
            hash="credits"
            params={{ id: person.id }}
            role="tab"
            to="/people/$id/credits"
          >
            Credits
          </Link>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
};
