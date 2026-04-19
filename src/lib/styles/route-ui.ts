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
