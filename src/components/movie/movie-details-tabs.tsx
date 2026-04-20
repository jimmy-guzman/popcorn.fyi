import { Link, useRouterState } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailsTabsProps {
  id: number;
}

const movieDetailTabs = [
  {
    label: "Overview",
    pathname: (movieId: number) => `/movies/${movieId}`,
    to: "/movies/$id" as const,
    value: "overview",
  },
  {
    label: "Providers",
    pathname: (movieId: number) => `/movies/${movieId}/watch`,
    to: "/movies/$id/watch" as const,
    value: "providers",
  },
  {
    label: "Similar",
    pathname: (movieId: number) => `/movies/${movieId}/similar`,
    to: "/movies/$id/similar" as const,
    value: "similar",
  },
  {
    label: "Credits",
    pathname: (movieId: number) => `/movies/${movieId}/credits`,
    to: "/movies/$id/credits" as const,
    value: "credits",
  },
] as const;

export const MovieDetailsTabs = ({ id }: MovieDetailsTabsProps) => {
  const tabValue = useRouterState({
    select: (s) => {
      const pathname =
        s.location.pathname.replace(/\/$/, "") || s.location.pathname;
      const match = movieDetailTabs.find(
        (tab) => pathname === tab.pathname(id),
      );

      return match?.value;
    },
  });

  return (
    <Tabs value={tabValue ?? null}>
      <TabsList className="w-full flex-wrap rounded border md:w-auto">
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
