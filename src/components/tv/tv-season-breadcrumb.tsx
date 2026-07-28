import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface TvSeasonBreadcrumbProps {
  episodeName?: string;
  id: number;
  season: number;
  seasonName?: string;
  showName?: string;
}

export const TvSeasonBreadcrumb = ({
  episodeName,
  id,
  season,
  seasonName,
  showName,
}: TvSeasonBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link params={{ id }} to="/tv-shows/$id" />}>
            {showName ?? "TV Show"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            render={<Link params={{ id }} to="/tv-shows/$id/seasons" />}
          >
            Seasons
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {episodeName === undefined ? (
            <BreadcrumbPage>{seasonName ?? `Season ${season}`}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              render={
                <Link
                  params={{ id, season }}
                  to="/tv-shows/$id/seasons/$season"
                />
              }
            >
              {seasonName ?? `Season ${season}`}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {episodeName === undefined ? null : (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{episodeName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
