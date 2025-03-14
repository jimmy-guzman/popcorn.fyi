import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "./utils";

const selectVariants = cva("dsy-select", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "dsy-select-md",
      lg: "dsy-select-lg",
      sm: "dsy-select-sm",
      xl: "dsy-select-xl",
      xs: "dsy-select-xs",
    },
  },
});

type HtmlSelectProps = Omit<React.ComponentProps<"select">, "size">;

type SelectVariants = VariantProps<typeof selectVariants>;

type SelectProps = HtmlSelectProps & SelectVariants;

/**
 * Select component to render a dropdown list.
 *
 * This component wraps the native `select` element and supports custom class names.
 *
 * @example
 * <Select>
 *   <option value="apple">Apple</option>
 *   <option value="banana">Banana</option>
 *   <option value="cherry">Cherry</option>
 * </Select>
 *
 * @param props - Props for the `select` element, including `className`, `children`, and other native attributes.
 *
 * @returns A styled `select` element.
 *
 * @see [DaisyUI Select](https://v5.daisyui.com/components/select/)
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";

export { Select };
