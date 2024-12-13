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
      <div className="grid min-h-[calc(100vh-8rem)] grid-cols-5 place-content-center content-center justify-center gap-4">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};
