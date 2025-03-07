import type { ReactNode } from "react";

import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        className="dsy-card dsy-card-sm md:dsy-card-normal h-full shadow-xl"
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

const CardContent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <div className="dsy-card-body" ref={ref}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

const CardTitle = forwardRef<HTMLHeadingElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <h2 className="dsy-card-title" ref={ref}>
        {children}
      </h2>
    );
  },
);

CardTitle.displayName = "CardTitle";

const CardImage = forwardRef<HTMLElement, { alt?: string; src: string }>(
  ({ alt, src }, ref) => {
    return (
      <figure ref={ref}>
        <img alt={alt} loading="lazy" src={src} />
      </figure>
    );
  },
);

CardImage.displayName = "CardImage";

export { Card, CardContent, CardImage, CardTitle };
