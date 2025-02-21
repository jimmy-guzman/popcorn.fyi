import { Button } from "@popcorn.fyi/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";

import { personExternalOptions } from "@/api/people/details.external";

interface WikipediaButtonProps {
  id: number;
}

export const WikipediaButton = ({ id }: WikipediaButtonProps) => {
  const { data } = useSuspenseQuery(personExternalOptions(id));

  return data.wikipedia_url ? (
    <Button asChild color="neutral">
      <a href={data.wikipedia_url} rel="noreferrer" target="_blank">
        <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
        <span className="icon-[simple-icons--wikipedia] h-5 w-5" />
      </a>
    </Button>
  ) : null;
};
