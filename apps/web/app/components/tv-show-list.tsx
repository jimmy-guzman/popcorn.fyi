import { TVShowCard } from "./tv-show-card";

interface TVShowListProps {
  description: string;
  title: string;
  tvShows: {
    first_air_date?: string;
    id: number;
    name?: string;
    poster_path?: string;
    vote_average?: number;
  }[];
}

export const TVShowList = ({
  description,
  title,
  tvShows,
}: TVShowListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="prose dsy-prose">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="grid min-h-[calc(100vh-8rem)] grid-cols-5 place-content-center content-center justify-center gap-4">
        {tvShows.map((tvShow) => {
          return <TVShowCard key={tvShow.id} tvShow={tvShow} />;
        })}
      </div>
    </div>
  );
};
