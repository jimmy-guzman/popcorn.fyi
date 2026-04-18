import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/** Router-driven tab row (TanStack `Link` with `role="tab"`). */
export const routeTabListClassName =
  "inline-flex h-auto min-h-10 w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/40 p-1 md:w-auto";

export const routeTabLinkClassName = cn(
  buttonVariants({ variant: "ghost", size: "sm" }),
  "text-muted-foreground",
);

export const routeTabLinkActiveClassName = cn(
  buttonVariants({ variant: "secondary", size: "sm" }),
  "shadow-sm",
);

const pageBtn = cn(
  buttonVariants({ variant: "outline", size: "default" }),
  "min-w-9 rounded-none border-0 first:rounded-l-md last:rounded-r-md",
);

const pageBtnActive = cn(
  buttonVariants({ variant: "default", size: "default" }),
  "min-w-9 rounded-none border-0 first:rounded-l-md last:rounded-r-md",
);

export const paginationLinkClassName = pageBtn;

export const paginationLinkActiveClassName = pageBtnActive;

export const paginationEllipsisClassName = cn(
  pageBtn,
  "pointer-events-none opacity-50",
);
