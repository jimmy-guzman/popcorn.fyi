import { useSuspenseQuery } from "@tanstack/react-query";

import { movieExternalOptions } from "@/api/movie/details.external";

interface WikipediaButtonProps {
  id: number;
}

export const ExternalLinksSkeleton = () => {
  return (
    <>
      <div className="h-10 w-10 dsy-skeleton rounded md:w-32" />
      <div className="h-10 w-10 dsy-skeleton rounded md:w-28" />
    </>
  );
};

export const ExternalLinks = ({ id }: WikipediaButtonProps) => {
  const { data } = useSuspenseQuery(movieExternalOptions(id));

  return (
    <>
      {data.wikipedia_url && (
        <a
          className="dsy-btn dsy-btn-neutral"
          href={data.wikipedia_url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
          <span className="icon-[simple-icons--wikipedia] h-5 w-5" />
        </a>
      )}
      {data.imdb_url && (
        <a
          className="dsy-btn dsy-btn-neutral"
          href={data.imdb_url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="sr-only md:not-sr-only">IMDb</span>{" "}
          <span className="icon-[simple-icons--imdb] h-5 w-5" />
        </a>
      )}
    </>
  );
};
