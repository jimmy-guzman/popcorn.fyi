import * as React from "react";

import type { RequireChildren } from "./types";

import { cn } from "./utils";

interface TooltipProps extends RequireChildren<HTMLDivElement> {
  content?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, ...props }, ref) => {
    return (
      <div
        className={cn("dsy-tooltip", className)}
        data-tip={content}
        ref={ref}
        {...props}
      />
    );
  },
);

Tooltip.displayName = "Tooltip";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  RequireChildren<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("dsy-tooltip-content", className)}
      ref={ref}
      {...props}
    />
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent };
