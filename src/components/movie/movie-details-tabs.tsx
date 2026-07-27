import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailsTabsProps {
  id: number;
}

const movieDetailTabs = [
  {
    label: "Overview",
    pathname: (movieId: number) => {
      return `/movies/${movieId}`;
    },
    to: "/movies/$id" as const,
    value: "overview",
  },
  {
    label: "Providers",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/watch`;
    },
    to: "/movies/$id/watch" as const,
    value: "providers",
  },
  {
    label: "Credits",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/credits`;
    },
    to: "/movies/$id/credits" as const,
    value: "credits",
  },
  {
    label: "Recommendations",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/recommendations`;
    },
    to: "/movies/$id/recommendations" as const,
    value: "recommendations",
  },
  {
    label: "Similar",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/similar`;
    },
    to: "/movies/$id/similar" as const,
    value: "similar",
  },
  {
    label: "Images",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/images`;
    },
    to: "/movies/$id/images" as const,
    value: "images",
  },
  {
    label: "Videos",
    pathname: (movieId: number) => {
      return `/movies/${movieId}/videos`;
    },
    to: "/movies/$id/videos" as const,
    value: "videos",
  },
] as const;

export const MovieDetailsTabs = ({ id }: MovieDetailsTabsProps) => {
  const tabValue = useRouterState({
    select: (s) => {
      const pathname =
        s.location.pathname.replace(/\/$/, "") || s.location.pathname;
      const match = movieDetailTabs.find((tab) => {
        return pathname === tab.pathname(id);
      });

      return match?.value;
    },
  });

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [tabValue]);

  return (
    <Tabs value={tabValue ?? null}>
      <TabsList
        className="w-full justify-start overflow-x-auto rounded border md:w-auto md:justify-center"
        ref={listRef}
      >
        {movieDetailTabs.map((tab) => {
          return (
            <TabsTrigger
              key={tab.value}
              nativeButton={false}
              render={<Link params={{ id }} resetScroll={false} to={tab.to} />}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
