import { Link } from "@tanstack/react-router";

import {
  routeTabLinkActiveClassName,
  routeTabLinkClassName,
  routeTabListClassName,
} from "@/lib/styles/route-ui";

interface MovieDetailsTabsProps {
  id: number;
}

export const MovieDetailsTabs = ({ id }: MovieDetailsTabsProps) => {
  return (
    <div className={routeTabListClassName} role="tablist">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="overview"
        params={{ id }}
        role="tab"
        to="/movies/$id"
      >
        Overview
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="providers"
        params={{ id }}
        role="tab"
        to="/movies/$id/watch"
      >
        Providers
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="similar"
        params={{ id }}
        role="tab"
        to="/movies/$id/similar"
      >
        Similar
      </Link>
      <Link
        activeProps={{ className: routeTabLinkActiveClassName }}
        className={routeTabLinkClassName}
        hash="cast"
        params={{ id }}
        role="tab"
        to="/movies/$id/credits"
      >
        Credits
      </Link>
    </div>
  );
};
