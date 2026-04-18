import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ListContent } from "../shared/list-content";
import { ListPagination } from "../shared/list-pagination";
import { TVShowCard } from "./tv-show-card";

interface TvDiscoverListProps {
  page?: number;
  totalPages?: number;
  tv: {
    first_air_date?: string;
    id: number;
    media_type?: string;
    name?: string;
    poster_path?: string;
    vote_average?: number;
  }[];
}

export const TvDiscoverList = ({
  page,
  totalPages,
  tv,
}: TvDiscoverListProps) => {
  return tv.length > 0 ? (
    <div className="flex flex-col gap-4">
      <ListContent>
        {tv.map((tvSeries) => {
          return <TVShowCard key={tvSeries.id} tvShow={tvSeries} />;
        })}
      </ListContent>
      {page && totalPages && totalPages > 1 ? (
        <ListPagination page={page} totalPages={totalPages} />
      ) : null}
    </div>
  ) : (
    <Alert variant="destructive">
      <span className="icon-[lucide--alert-circle] size-6" />
      <AlertTitle>No results</AlertTitle>
      <AlertDescription>
        No results available based on your filters.
      </AlertDescription>
    </Alert>
  );
};
