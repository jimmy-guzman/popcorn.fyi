import type { ReactNode } from "react";

const Card = ({
  children,
  ref,
}: { children: ReactNode } & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      className="dsy-card dsy-card-sm md:dsy-card-normal h-full shadow-xl"
      ref={ref}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";

const CardContent = ({
  children,
  ref,
}: { children: ReactNode } & {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="dsy-card-body" ref={ref}>
      {children}
    </div>
  );
};

CardContent.displayName = "CardContent";

const CardTitle = ({
  children,
  ref,
}: { children: ReactNode } & {
  ref?: React.RefObject<HTMLHeadingElement | null>;
}) => {
  return (
    <h2 className="dsy-card-title" ref={ref}>
      {children}
    </h2>
  );
};

CardTitle.displayName = "CardTitle";

const CardImage = ({
  alt,
  ref,
  src,
}: { alt?: string; src: string } & {
  ref?: React.RefObject<HTMLElement | null>;
}) => {
  return (
    <figure ref={ref}>
      <img alt={alt} loading="lazy" src={src} />
    </figure>
  );
};

CardImage.displayName = "CardImage";

export { Card, CardContent, CardImage, CardTitle };
