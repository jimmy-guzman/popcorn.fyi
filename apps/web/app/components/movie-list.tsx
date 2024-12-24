import { ListContent } from "./list-content";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  description: string;
  movies: {
    id: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average: number;
  }[];
  title: string;
}

export const MovieList = ({ description, movies, title }: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="prose dsy-prose">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <ListContent>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContent>
    </div>
  );
};
