import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ProseProps {
  children: ReactNode;
  size?: "lg" | "sm";
}

export const Prose = ({ children, size }: ProseProps) => {
  return (
    <article
      className={cn("dsy-prose prose", {
        "prose-lg": size === "lg",
        "prose-sm": size === "sm",
      })}
    >
      {children}
    </article>
  );
};
