import { Link, useRouterState } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TvShowDetailsTabsProps {
  id: number;
}

export const TvShowDetailsTabs = ({ id }: TvShowDetailsTabsProps) => {
  const tabValue = useRouterState({
    select: (s) => {
      const pathname =
        s.location.pathname.replace(/\/$/, "") || s.location.pathname;
      const base = `/tv-shows/${id}`;

      if (pathname === `${base}/credits`) return "credits";

      if (pathname === `${base}/recommendations`) return "recommendations";

      if (pathname === `${base}/similar`) return "similar";

      if (pathname === `${base}/watch`) return "providers";

      if (pathname === `${base}/videos`) return "videos";

      if (pathname === base) return "overview";

      return undefined;
    },
  });

  return (
    <Tabs value={tabValue ?? null}>
      <TabsList className="w-full flex-wrap rounded border md:w-auto">
        <TabsTrigger
          nativeButton={false}
          render={
            <Link params={{ id }} resetScroll={false} to="/tv-shows/$id" />
          }
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link
              params={{ id }}
              resetScroll={false}
              to="/tv-shows/$id/watch"
            />
          }
          value="providers"
        >
          Providers
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link
              params={{ id }}
              resetScroll={false}
              to="/tv-shows/$id/credits"
            />
          }
          value="credits"
        >
          Credits
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link
              params={{ id }}
              resetScroll={false}
              to="/tv-shows/$id/recommendations"
            />
          }
          value="recommendations"
        >
          Recommendations
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link
              params={{ id }}
              resetScroll={false}
              to="/tv-shows/$id/similar"
            />
          }
          value="similar"
        >
          Similar
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link
              params={{ id }}
              resetScroll={false}
              to="/tv-shows/$id/videos"
            />
          }
          value="videos"
        >
          Videos
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
