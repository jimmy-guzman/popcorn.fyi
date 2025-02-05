import { ListContent } from "./list-content";
import { ListPagination } from "./list-pagination";
import { MovieCard } from "./movie-card";

interface Movie {
  id: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  vote_average: number;
}

interface MovieDiscoverListOptions {
  movies: Movie[];
  page: number;
  totalPages: number;
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
      {totalPages > 1 && <ListPagination page={page} totalPages={totalPages} />}
    </div>
  ) : (
    <div className="dsy-alert" role="alert">
      <span className="icon-[lucide--alert-circle] text-error h-6 w-6" />
      <span>No results available based on your filters.</span>
    </div>
  );
};
