import { useSuspenseQuery } from "@tanstack/react-query";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { tvExternalOptions } from "@/data/tv/details.external";
import { cn } from "@/lib/cn";

interface WikipediaButtonProps {
  id: number;
}
export const ExternalLinksSkeleton = () => {
  return (
    <>
      <Skeleton className="h-10 w-10 rounded md:w-32" />
      <Skeleton className="h-10 w-10 rounded md:w-28" />
    </>
  );
};

export const ExternalLinks = ({ id }: WikipediaButtonProps) => {
  const { data } = useSuspenseQuery(tvExternalOptions(id));

  return (
    <>
      {data.wikipedia_url && (
        <a
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          href={data.wikipedia_url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
          <span className="icon-[simple-icons--wikipedia] size-5" />
        </a>
      )}
      {data.imdb_url && (
        <a
          className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          href={data.imdb_url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">IMDb</span>{" "}
          <span className="icon-[simple-icons--imdb] size-5" />
        </a>
      )}
    </>
  );
};
