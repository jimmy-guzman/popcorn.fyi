import type { ReactNode } from "@tanstack/react-router";

import { cn } from "@/lib/cn";

interface ProseProps {
  children: ReactNode;
  size?: "lg";
}

export const Prose = ({ children, size }: ProseProps) => {
  return (
    <article className={cn("prose dsy-prose", { "prose-lg": size === "lg" })}>
      {children}
    </article>
  );
};
