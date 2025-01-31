import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cva } from "class-variance-authority";

import type { OmitColor } from "./types";

import { cn } from "./utils";

const badgeVariants = cva("dsy-badge", {
  defaultVariants: {
    color: "default",
    size: "default",
    variant: "default",
  },
  variants: {
    color: {
      accent: "dsy-badge-accent",
      default: "",
      error: "dsy-badge-error",
      info: "dsy-badge-info",
      neutral: "dsy-badge-neutral",
      primary: "dsy-badge-primary",
      secondary: "dsy-badge-secondary",
      success: "dsy-badge-success",
      warning: "dsy-badge-warning",
    },
    size: {
      default: "dsy-badge-md",
      lg: "dsy-badge-lg",
      sm: "dsy-badge-sm",
      xl: "dsy-badge-xl",
      xs: "dsy-badge-xs",
    },
    variant: {
      dash: "dsy-badge-dash",
      default: "",
      ghost: "dsy-badge-ghost",
      outline: "dsy-badge-outline",
      soft: "dsy-badge-soft",
    },
  },
});

type HtmlSpanProps = OmitColor<React.HTMLAttributes<HTMLSpanElement>>;

type BadgeVariants = VariantProps<typeof badgeVariants>;

interface BadgeProps extends BadgeVariants, HtmlSpanProps {}

const Badge = ({ className, color, size, variant, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ color, size, variant }), className)}
      {...props}
    />
  );
};

export { Badge };
