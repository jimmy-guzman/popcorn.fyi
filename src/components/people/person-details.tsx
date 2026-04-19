import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { date } from "@/lib/date";
import {
  routeTabLinkActiveClassName,
  routeTabLinkClassName,
  routeTabListClassName,
} from "@/lib/styles/route-ui";
import { tmdbContent } from "@/lib/tmdb-content";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import {
  MediaDetailViewBackdrop,
  MediaDetailViewContent,
  MediaDetailViewHero,
  MediaDetailViewPoster,
  MediaDetailViewRoot,
} from "../media/media-detail-view";
import { MediaRating } from "../media/media-rating";
import { Prose } from "../shared/prose";
import { ShareButton } from "../shared/share-button";
import { WikipediaButton } from "./wikipedia-button";

interface PersonDetailsProps {
  person: {
    backdrop_path?: string;
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
  const card = (
    <Card
      className={cn("min-w-0 flex-1", !person.profile_path && "md:col-span-2")}
    >
      <CardHeader
        className={cn(
          "flex flex-row flex-wrap gap-2 border-0 pb-2",
          "lg:flex-nowrap lg:justify-end",
        )}
      >
        <MediaRating average={person.popularity} />
        <Badge variant="secondary">
          {person.known_for_department ?? "N/A"}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
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
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-2 border-0 pt-0 md:justify-start">
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
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col gap-0">
      <MediaDetailViewBackdrop
        aria-label={person.name}
        backdropPath={person.backdrop_path}
        role="img"
      />
      <MediaDetailViewRoot>
        <MediaDetailViewHero
          className={
            person.backdrop_path ? "md:-mt-32 xl:-mt-40" : "md:mt-8 xl:mt-12"
          }
        >
          {person.profile_path ? (
            <MediaDetailViewPoster overlap={Boolean(person.backdrop_path)}>
              <img
                alt={person.name}
                className="size-full rounded-none border object-cover shadow-2xl"
                src={tmdbImageUrl(person.profile_path, "w500")}
              />
            </MediaDetailViewPoster>
          ) : null}
          {card}
        </MediaDetailViewHero>
        <MediaDetailViewContent className="flex flex-col gap-4">
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
        </MediaDetailViewContent>
      </MediaDetailViewRoot>
    </div>
  );
};
