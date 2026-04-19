import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import { date } from "@/lib/date";
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
  const tabValue = useRouterState({
    select: (s) => {
      if (!person.id) return undefined;

      const pathname =
        s.location.pathname.replace(/\/$/, "") || s.location.pathname;
      const base = `/people/${person.id}`;

      if (pathname === `${base}/credits`) return "credits";

      if (pathname === base) return "known-for";

      return undefined;
    },
  });

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
              {person.place_of_birth
                ? `${date(person.birthday)} - ${person.place_of_birth}`
                : date(person.birthday)}
            </p>
          ) : (
            <p>No birthday available.</p>
          )}
          {person.biography ? (
            <div
              // Biography HTML is sanitized in `tmdbContent` (DOMPurify).
              // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- sanitized HTML only
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
        {person.name && person.id ? (
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
        <MediaDetailViewContent className="flex flex-col gap-8">
          {person.id ? (
            <Tabs value={tabValue ?? null}>
              <TabsList className="w-full flex-wrap rounded border md:w-auto">
                <TabsTrigger
                  nativeButton={false}
                  render={
                    <Link
                      params={{ id: person.id }}
                      resetScroll={false}
                      to="/people/$id"
                    />
                  }
                  value="known-for"
                >
                  Known For
                </TabsTrigger>
                <TabsTrigger
                  nativeButton={false}
                  render={
                    <Link
                      params={{ id: person.id }}
                      resetScroll={false}
                      to="/people/$id/credits"
                    />
                  }
                  value="credits"
                >
                  Credits
                </TabsTrigger>
              </TabsList>
            </Tabs>
          ) : null}
          <Outlet />
        </MediaDetailViewContent>
      </MediaDetailViewRoot>
    </div>
  );
};
