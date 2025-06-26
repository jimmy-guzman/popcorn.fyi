import { Button } from "@popcorn.fyi/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";

import { tvExternalOptions } from "@/api/tv/details.external";

interface WikipediaButtonProps {
  id: number;
}
export const ExternalLinksSkeleton = () => {
  return (
    <>
      <div className="dsy-skeleton h-10 w-10 rounded md:w-32" />
      <div className="dsy-skeleton h-10 w-10 rounded md:w-28" />
    </>
  );
};

export const ExternalLinks = ({ id }: WikipediaButtonProps) => {
  const { data } = useSuspenseQuery(tvExternalOptions(id));

  return (
    <>
      {data.wikipedia_url && (
        <Button asChild color="neutral">
          <a href={data.wikipedia_url} rel="noreferrer" target="_blank">
            <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
            <span className="icon-[simple-icons--wikipedia] h-5 w-5" />
          </a>
        </Button>
      )}
      {data.imdb_url && (
        <Button asChild color="neutral">
          <a href={data.imdb_url} rel="noreferrer" target="_blank">
            <span className="sr-only md:not-sr-only">IMDb</span>{" "}
            <span className="icon-[simple-icons--imdb] h-5 w-5" />
          </a>
        </Button>
      )}
    </>
  );
};
