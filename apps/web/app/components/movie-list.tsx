import { ListContent } from "./list-content";
import { MovieCard } from "./movie-card";
import { Prose } from "./prose";

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
      <Prose>
        <h1>{title}</h1>
        <p>{description}</p>
      </Prose>
      <ListContent>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContent>
    </div>
  );
};
