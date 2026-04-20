import { useSuspenseQuery } from "@tanstack/react-query";

import { buttonVariants } from "@/components/ui/button";
import { personExternalOptions } from "@/data/people/details.external";
import { cn } from "@/lib/cn";

interface WikipediaButtonProps {
  id: number;
}

export const WikipediaButton = ({ id }: WikipediaButtonProps) => {
  const { data } = useSuspenseQuery(personExternalOptions(id));

  return data.wikipedia_url ? (
    <a
      className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
      href={data.wikipedia_url}
      rel="noreferrer"
      target="_blank"
    >
      <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
      <span className="icon-[simple-icons--wikipedia] size-5" />
    </a>
  ) : null;
};
