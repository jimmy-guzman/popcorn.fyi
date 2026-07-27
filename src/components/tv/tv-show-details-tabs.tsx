import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

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

      if (pathname === `${base}/images`) return "images";

      if (pathname === `${base}/videos`) return "videos";

      if (pathname === base) return "overview";

      return undefined;
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
              to="/tv-shows/$id/images"
            />
          }
          value="images"
        >
          Images
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
