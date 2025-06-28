import type * as React from "react";

export interface WithChildren<T> extends React.HTMLAttributes<T> {
  children: React.ReactNode;
}

export type WithRef<T, K> = T & {
  ref?: React.RefCallback<K | null> | React.RefObject<K | null>;
};
