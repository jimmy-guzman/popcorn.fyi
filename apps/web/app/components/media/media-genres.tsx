import { Badge } from "@popcorn.fyi/ui/badge";
import { Link } from "@tanstack/react-router";

interface MediaGenresProps {
  /** List of genres with their IDs and optional names */
  genres?: { id: number; name?: string }[];
  /** Type of media: "movies" or "tv-shows" */
  media: "movies" | "tv-shows";
}

/**
 * Renders a list of genre badges as links to the respective discover pages.
 * @param props - Component props
 *
 * @param [props.genres] - List of genres
 *
 * @param props.media - The type of media (movies or TV shows)
 *
 * @returns A list of badges linking to genre-specific discover pages
 */
export const MediaGenres = ({ genres = [], media }: MediaGenresProps) => {
  return genres.map((genre) => {
    return (
      <Badge asChild color="neutral" key={genre.id}>
        <Link
          search={{ with_genres: genre.id.toString() }}
          to={`/${media}/discover`}
        >
          {genre.name ?? "Unknown"}
        </Link>
      </Badge>
    );
  });
};
