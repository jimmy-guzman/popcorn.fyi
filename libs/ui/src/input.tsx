import type * as React from "react";

import type { WithRef } from "./types";

import { cn } from "./utils";

const Input = ({
  className,
  ref,
  type,
  ...props
}: WithRef<React.ComponentProps<"input">, HTMLInputElement>) => {
  return (
    <input
      className={cn("[&:not(label_*)]:dsy-input", className)}
      ref={ref}
      type={type}
      {...props}
    />
  );
};

export { Input };
