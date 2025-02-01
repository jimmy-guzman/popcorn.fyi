import type { HTMLAttributes, ReactNode } from "react";

interface ListContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "classname" | "role"> {
  children: ReactNode;
}

export const ListContent = ({ children, ...props }: ListContentProps) => {
  return (
    <div
      {...props}
      className="grid grid-cols-2 place-content-center content-start justify-center gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-5"
      role="list"
    >
      {children}
    </div>
  );
};
