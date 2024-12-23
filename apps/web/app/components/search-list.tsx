import { MovieCard } from "./movie-card";
import { PersonCard } from "./person-card";
import { TVShowCard } from "./tv-show-card";

interface SearchListProps {
  query: string;
  results: {
    id: number;
    media_type?: string;
    vote_average: number;
  }[];
}

export const SearchList = ({ query, results }: SearchListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="prose dsy-prose">
        <h1>Search results for &quot;{query}&quot;</h1>
      </div>
      <div className="grid min-h-[calc(100vh-8rem)] place-content-center content-center justify-center md:grid-cols-2 md:gap-2 lg:grid-cols-5 lg:gap-4">
        {results.map((result) => {
          if (result.media_type === "movie") {
            return <MovieCard key={result.id} movie={result} />;
          }

          if (result.media_type === "tv") {
            return <TVShowCard key={result.id} tvShow={result} />;
          }

          if (result.media_type === "people") {
            return <PersonCard key={result.id} person={result} />;
          }

          return null;
        })}
      </div>
    </div>
  );
};
