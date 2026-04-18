import { Link } from "@tanstack/react-router";

import {
  routeTabLinkActiveClassName,
  routeTabLinkClassName,
  routeTabListClassName,
} from "@/lib/styles/route-ui";

interface TvShowDetailsTabsProps {
  id: number;
}

export const TvShowDetailsTabs = ({ id }: TvShowDetailsTabsProps) => {
  return (
    <div className={routeTabListClassName} role="tablist">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="overview"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id"
      >
        Overview
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="providers"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id/watch"
      >
        Providers
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="similar"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id/similar"
      >
        Similar
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="cast"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id/credits"
      >
        Credits
      </Link>
    </div>
  );
};
