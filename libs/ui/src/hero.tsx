import type { WithChildren, WithRef } from "./types";

import { cn } from "./utils";

const Hero = ({
  backgroundImage,
  className,
  ref,
  ...props
}: WithRef<WithChildren<HTMLDivElement>, HTMLDivElement> & {
  backgroundImage?: string;
}) => {
  return (
    <div
      className={cn("dsy-hero w-full", className)}
      ref={ref}
      role={backgroundImage ? "img" : undefined}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
      {...props}
    />
  );
};

Hero.displayName = "Hero";

const HeroContent = ({
  children,
  className,
  ref,
  ...props
}: WithRef<WithChildren<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={cn("dsy-hero-content", className)} ref={ref} {...props}>
      {children}
    </div>
  );
};

HeroContent.displayName = "HeroContent";

const HeroTitle = ({
  children,
  ref,
}: WithRef<WithChildren<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <h1 className="text-pretty text-5xl font-bold lg:text-7xl" ref={ref}>
      {children}
    </h1>
  );
};

HeroTitle.displayName = "HeroTitle";

const HeroOverlay = ({
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return <div className="dsy-hero-overlay bg-opacity-60" ref={ref} />;
};

HeroOverlay.displayName = "HeroOverlay";

const HeroBadges = ({
  children,
  ref,
}: WithRef<WithChildren<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className="flex w-full justify-end gap-2" ref={ref}>
      {children}
    </div>
  );
};

HeroBadges.displayName = "HeroBadges";

export { Hero, HeroBadges, HeroContent, HeroOverlay, HeroTitle };
