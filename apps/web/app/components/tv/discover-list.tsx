import { ListContent } from "../shared/list-content";
import { ListPagination } from "../shared/list-pagination";
import { TVShowCard } from "./tv-show-card";

interface TvDiscoverListProps {
  page: number;
  totalPages: number;
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
      {totalPages > 1 && <ListPagination page={page} totalPages={totalPages} />}
    </div>
  ) : (
    <div className="dsy-alert" role="alert">
      <span className="icon-[lucide--alert-circle] text-error h-6 w-6" />
      <span>No results available based on your filters.</span>
    </div>
  );
};
