import { ListContent } from "../shared/list-content";
import { Prose } from "../shared/prose";
import { TVShowCard } from "./tv-show-card";

interface TVShowListProps {
  description: string;
  title: string;
  tvShows: {
    first_air_date?: string;
    id: number;
    name?: string;
    poster_path?: string;
    vote_average: number;
  }[];
}

export const TVShowList = ({
  description,
  title,
  tvShows,
}: TVShowListProps) => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Prose>
        <h1>{title}</h1>
        <p>{description}</p>
      </Prose>
      <ListContent>
        {tvShows.map((tvShow) => (
          <TVShowCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </ListContent>
    </div>
  );
};
