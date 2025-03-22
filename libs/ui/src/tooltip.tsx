import type * as React from "react";

import type { WithChildren } from "./types";

import { cn } from "./utils";

interface TooltipProps extends WithChildren<HTMLDivElement> {
  content?: string;
}

const Tooltip = ({
  className,
  content,
  ref,
  ...props
}: TooltipProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      className={cn("dsy-tooltip", className)}
      data-tip={content}
      ref={ref}
      {...props}
    />
  );
};

Tooltip.displayName = "Tooltip";

const TooltipContent = ({
  className,
  ref,
  ...props
}: WithChildren<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      className={cn("dsy-tooltip-content", className)}
      ref={ref}
      {...props}
    />
  );
};

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent };
