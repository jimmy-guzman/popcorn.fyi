import { Link } from "@tanstack/react-router";

interface MovieDetailsTabsProps {
  id: string;
}

export const MovieDetailsTabs = ({ id }: MovieDetailsTabsProps) => {
  return (
    <div className="dsy-tabs dsy-tabs-box w-full md:w-auto" role="tablist">
      <Link
        activeOptions={{ exact: true }}
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="overview"
        params={{ id }}
        role="tab"
        to="/movies/$id"
      >
        Overview
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="providers"
        params={{ id }}
        role="tab"
        to="/movies/$id/watch"
      >
        Providers
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="similar"
        params={{ id }}
        role="tab"
        to="/movies/$id/similar"
      >
        Similar
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
        hash="expanded"
        params={{ id }}
        role="tab"
        to="/movies/$id/plot"
      >
        Plot
      </Link>
      <Link
        activeProps={{ className: "dsy-tab-active" }}
        className="dsy-tab"
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
