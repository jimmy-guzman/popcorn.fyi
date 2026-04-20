import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { MediaBackdropStrip } from "./media-backdrop-strip";

export function MediaDetailViewRoot({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("relative z-10", className)} {...props} />;
}

interface MediaDetailViewBackdropProps {
  "aria-label"?: string;
  "backdropPath"?: null | string;
  "className"?: string;
  "role"?: string;
}

export function MediaDetailViewBackdrop({
  "aria-label": ariaLabel,
  backdropPath,
  className,
  role,
}: MediaDetailViewBackdropProps) {
  if (!backdropPath) {
    return null;
  }

  return (
    <MediaBackdropStrip
      aria-label={ariaLabel}
      backdropPath={backdropPath}
      bleed
      bleedClassName={cn("hidden md:block", className)}
      role={role}
    />
  );
}

export function MediaDetailViewHero({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("container md:px-16 xl:px-32", className)} {...props}>
      <div className="grid gap-4 md:grid-cols-[auto,1fr] md:gap-10 xl:gap-16">
        {children}
      </div>
    </div>
  );
}

interface MediaDetailViewPosterProps extends ComponentProps<"div"> {
  overlap?: boolean;
}

export function MediaDetailViewPoster({
  className,
  overlap = true,
  ...props
}: MediaDetailViewPosterProps) {
  return (
    <div
      className={cn(
        "relative aspect-2/3 w-full place-self-start md:block md:w-56 lg:w-64 xl:w-80 border",
        overlap && "md:-mt-40 xl:-mt-56",
        className,
      )}
      {...props}
    />
  );
}

export function MediaDetailViewContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container mt-4 md:mt-8 md:px-16 xl:mt-12 xl:px-32",
        className,
      )}
      {...props}
    />
  );
}
