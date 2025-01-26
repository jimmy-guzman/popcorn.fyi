import type { ReactNode } from "@tanstack/react-router";

import { cn } from "@/lib/cn";

interface ProseProps {
  children: ReactNode;
  size?: "lg" | "sm";
}

export const Prose = ({ children, size }: ProseProps) => {
  return (
    <article
      className={cn("prose dsy-prose dark:prose-invert", {
        "prose-lg": size === "lg",
        "prose-sm": size === "sm",
      })}
    >
      {children}
    </article>
  );
};
