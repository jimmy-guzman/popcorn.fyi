import type { CellContext } from "@tanstack/react-table";

import { Link } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { tmdbImageUrl } from "@/lib/tmdb-images";

export const TitleNameTableCell = ({
  getValue,
  row,
}: CellContext<
  { id: number; media_type?: string; poster_path?: string },
  string | undefined
>) => {
  const credit = row.original;
  const title = getValue();

  return (
    <Link
      className={cn(
        "text-primary flex items-center gap-3 underline-offset-4 hover:underline",
      )}
      params={{ id: credit.id }}
      to={credit.media_type === "movie" ? "/movies/$id" : "/tv-shows/$id"}
    >
      {credit.poster_path ? (
        <Avatar className="hidden size-12 rounded md:inline-flex">
          <AvatarImage alt={title} src={tmdbImageUrl(credit.poster_path)} />
          <AvatarFallback />
        </Avatar>
      ) : null}
      {title}
    </Link>
  );
};
