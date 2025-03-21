import { MovieCard } from "../movie/movie-card";
import { PersonCard } from "../people/person-card";
import { ListContent } from "../shared/list-content";
import { Prose } from "../shared/prose";
import { TVShowCard } from "../tv/tv-show-card";

interface SearchListProps {
  query: string;
  results: {
    id: number;
    media_type?: string;
    vote_average?: number;
  }[];
}

export const SearchList = ({ query, results }: SearchListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Prose>
        <h1>Search results for &quot;{query}&quot;</h1>
      </Prose>
      <ListContent>
        {results.map((result) => {
          if (result.media_type === "movie") {
            return <MovieCard key={result.id} movie={result} />;
          }

          if (result.media_type === "tv") {
            return <TVShowCard key={result.id} tvShow={result} />;
          }

          if (result.media_type === "person") {
            return <PersonCard key={result.id} person={result} />;
          }

          return null;
        })}
      </ListContent>
    </div>
  );
};
