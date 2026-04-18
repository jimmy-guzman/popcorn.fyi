import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { tmdbImageUrl } from "@/lib/tmdb-images";

interface MediaBackdropStripProps {
  "aria-label"?: string;
  "backdropPath"?: null | string;
  /** Break out of `main` horizontal padding (`p-4`). */
  "bleed"?: boolean;
  "children"?: ReactNode;
  "className"?: string;
  "innerClassName"?: string;
  "role"?: string;
}

function MediaBackdropStrip({
  "aria-label": ariaLabel,
  backdropPath,
  bleed = false,
  children,
  className,
  innerClassName,
  role,
}: MediaBackdropStripProps) {
  const path = backdropPath;
  const hasBackdrop = Boolean(path);
  const showShell = hasBackdrop || Boolean(children);

  if (!showShell) {
    return null;
  }

  const isHeroContent = Boolean(children);

  const inner = (
    <div
      aria-label={ariaLabel}
      className={cn(
        "relative w-full overflow-hidden bg-muted bg-cover bg-center",
        "min-h-[calc(100dvh-5rem)]",
        isHeroContent
          ? "flex flex-col items-center justify-center rounded px-4 py-12 text-center sm:px-8 sm:py-16"
          : "rounded",
        className,
        innerClassName,
      )}
      role={role}
      style={
        hasBackdrop && path
          ? { backgroundImage: `url(${tmdbImageUrl(path)})` }
          : undefined
      }
    >
      {hasBackdrop ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            isHeroContent
              ? "bg-linear-to-t from-black/80 via-black/50 to-black/25"
              : "bg-black/25",
          )}
        />
      ) : null}
      {children ? (
        <div
          className={cn(
            "relative z-10 flex w-full max-w-4xl flex-col items-center gap-5 mx-auto",
            hasBackdrop
              ? "text-zinc-50 [&_h1]:drop-shadow-md [&_p]:drop-shadow-md"
              : "text-foreground",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );

  if (bleed) {
    return <div className="-mx-4 w-[calc(100%+2rem)] max-w-none">{inner}</div>;
  }

  return inner;
}

export { MediaBackdropStrip };
