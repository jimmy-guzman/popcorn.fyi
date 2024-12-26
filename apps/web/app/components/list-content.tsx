import type { ReactNode } from "react";

export const ListContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 place-content-center content-center justify-center gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {children}
    </div>
  );
};
