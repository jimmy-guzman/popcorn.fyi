import type { ReactNode } from "react";

import { cn } from "@popcorn.fyi/ui/utils";

interface ProseProps {
  children: ReactNode;
  size?: "lg" | "sm";
}

export const Prose = ({ children, size }: ProseProps) => {
  return (
    <article
      className={cn("prose dsy-prose", {
        "prose-lg": size === "lg",
        "prose-sm": size === "sm",
      })}
    >
      {children}
    </article>
  );
};
