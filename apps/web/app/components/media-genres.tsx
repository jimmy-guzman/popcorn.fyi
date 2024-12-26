interface MediaGenresProps {
  genres?: { id: number; name?: string }[];
}

export const MediaGenres = ({ genres = [] }: MediaGenresProps) => {
  return genres.map((genre) => {
    return (
      <span className="dsy-badge dsy-badge-neutral" key={genre.id}>
        {genre.name}
      </span>
    );
  });
};
