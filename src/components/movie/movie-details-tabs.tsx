import { Link, useRouterState } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailsTabsProps {
  id: number;
}

export const MovieDetailsTabs = ({ id }: MovieDetailsTabsProps) => {
  const tabValue = useRouterState({
    select: (s) => {
      const pathname =
        s.location.pathname.replace(/\/$/, "") || s.location.pathname;
      const base = `/movies/${id}`;

      if (pathname === `${base}/credits`) return "credits";

      if (pathname === `${base}/similar`) return "similar";

      if (pathname === `${base}/watch`) return "providers";

      if (pathname === base) return "overview";

      return undefined;
    },
  });

  return (
    <Tabs value={tabValue ?? null}>
      <TabsList className="w-full flex-wrap rounded border md:w-auto">
        <TabsTrigger
          nativeButton={false}
          render={<Link params={{ id }} resetScroll={false} to="/movies/$id" />}
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={
            <Link params={{ id }} resetScroll={false} to="/movies/$id/watch" />
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
              to="/movies/$id/similar"
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
              to="/movies/$id/credits"
            />
          }
          value="credits"
        >
          Credits
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
