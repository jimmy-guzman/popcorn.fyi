import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ListContent } from "../shared/list-content";
import { ListPagination } from "../shared/list-pagination";
import { MovieCard } from "./movie-card";

interface Movie {
  id: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  vote_average?: number;
}

interface MovieDiscoverListOptions {
  movies: Movie[];
  page?: number;
  totalPages?: number;
}

export const MovieDiscoverList = ({
  movies,
  page,
  totalPages,
}: MovieDiscoverListOptions) => {
  return movies.length > 0 ? (
    <div className="flex flex-col gap-4">
      <ListContent>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
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
