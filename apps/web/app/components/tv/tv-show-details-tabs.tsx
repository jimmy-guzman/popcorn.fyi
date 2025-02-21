import { Link } from "@tanstack/react-router";

interface TvShowDetailsTabsProps {
  id: string;
}

export const TvShowDetailsTabs = ({ id }: TvShowDetailsTabsProps) => {
  return (
    <div className="dsy-tabs dsy-tabs-box w-full md:w-auto" role="tablist">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="overview"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id"
      >
        Overview
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="providers"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id/watch"
      >
        Watch
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="providers"
        params={{ id }}
        role="tab"
        to="/tv-shows/$id/similar"
      >
        Similar
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
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
