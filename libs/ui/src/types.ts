import type * as React from "react";

export type OmitColor<T extends { color?: string }> = Omit<T, "color">;

export interface RequireChildren<T> extends React.HTMLAttributes<T> {
  children: React.ReactNode;
}
