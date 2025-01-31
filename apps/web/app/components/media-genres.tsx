import { Badge } from "@popcorn.fyi/ui/badge";

interface MediaGenresProps {
  genres?: { id: number; name?: string }[];
}

export const MediaGenres = ({ genres = [] }: MediaGenresProps) => {
  return genres.map((genre) => {
    return (
      <Badge color="neutral" key={genre.id}>
        {genre.name}
      </Badge>
    );
  });
};
