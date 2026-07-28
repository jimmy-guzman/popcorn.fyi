import type { ReactNode } from "react";

import { date } from "@/lib/date";
import { language } from "@/lib/language";
import { tmdbImageUrl } from "@/lib/tmdb-images";

interface MediaPreviewProps {
  /**
   * Call to action for the previewed title. The popup opens beside the card,
   * so the cursor lands here with nothing to click without one.
   */
  action?: ReactNode;
  backdropPath?: string;
  /** "Released" for movies, "First aired" for TV. */
  dateLabel: string;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: string;
  posterPath?: string;
  releaseDate?: string;
  title: string;
  voteCount?: number;
}

/**
 * Hover companion to a media card, composed as a scale model of the detail
 * page it links to: backdrop, poster overlapping up into it, details beside.
 *
 * Both images are decorative here, since the title sits next to them as text.
 */
export const MediaPreview = ({
  action,
  backdropPath,
  dateLabel,
  originalLanguage,
  originalTitle,
  overview,
  posterPath,
  releaseDate,
  title,
  voteCount,
}: MediaPreviewProps) => {
  const stats = [
    releaseDate ? { label: dateLabel, value: date(releaseDate) } : undefined,
    originalLanguage
      ? { label: "Language", value: language(originalLanguage) }
      : undefined,
    voteCount
      ? { label: "Votes", value: voteCount.toLocaleString() }
      : undefined,
  ].filter(Boolean);

  return (
    <div className="flex flex-col">
      {backdropPath ? (
        <img
          alt=""
          aria-hidden
          className="aspect-video w-full object-cover"
          decoding="async"
          loading="lazy"
          src={tmdbImageUrl(backdropPath, "w500")}
        />
      ) : (
        <div aria-hidden className="aspect-video w-full bg-muted" />
      )}
      <div className="flex items-start gap-3 px-3 pb-3">
        <div className="-mt-16 w-24 shrink-0 border">
          {posterPath ? (
            <img
              alt=""
              aria-hidden
              className="aspect-2/3 w-full object-cover"
              decoding="async"
              loading="lazy"
              src={tmdbImageUrl(posterPath, "w185")}
            />
          ) : (
            <div aria-hidden className="aspect-2/3 w-full bg-muted" />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-3 pt-2">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {originalTitle && originalTitle !== title ? (
              <p className="text-muted-foreground">{originalTitle}</p>
            ) : null}
          </div>
          {stats.length > 0 ? (
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
              {stats.map((stat) => {
                return (
                  <div className="flex flex-col" key={stat.label}>
                    <dt className="text-muted-foreground">{stat.label}</dt>
                    <dd className="tabular-nums">{stat.value}</dd>
                  </div>
                );
              })}
            </dl>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 px-3 pb-3">
        <p className="line-clamp-4 text-muted-foreground">
          {overview ?? "No overview available."}
        </p>
        {action}
      </div>
    </div>
  );
};
