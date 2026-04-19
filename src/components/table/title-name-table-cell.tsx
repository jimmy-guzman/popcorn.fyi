import type { CellContext } from "@tanstack/react-table";

import { Link } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { tmdbImageUrl } from "@/lib/tmdb-images";

function initials(label: string) {
  const parts = label.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0]?.[0];
    const last = parts.at(-1)?.[0];

    if (first && last) return `${first}${last}`.toUpperCase();
  }

  return label.slice(0, 2).toUpperCase() || "?";
}

export const TitleNameTableCell = ({
  getValue,
  row,
}: CellContext<
  { id: number; media_type?: string; name?: string; poster_path?: string },
  string | undefined
>) => {
  const credit = row.original;
  const title = getValue() ?? credit.name ?? "Untitled";

  return (
    <Link
      className={cn(
        "text-primary flex items-center gap-3 underline-offset-4 hover:underline",
      )}
      params={{ id: credit.id }}
      to={credit.media_type === "movie" ? "/movies/$id" : "/tv-shows/$id"}
    >
      <Avatar className="hidden size-12 rounded md:inline-flex">
        {credit.poster_path ? (
          <AvatarImage alt={title} src={tmdbImageUrl(credit.poster_path)} />
        ) : null}
        <AvatarFallback>{initials(title)}</AvatarFallback>
      </Avatar>
      {title}
    </Link>
  );
};
