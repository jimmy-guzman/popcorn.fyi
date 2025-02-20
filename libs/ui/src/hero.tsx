import type { ReactNode } from "react";

import { forwardRef } from "react";

import type { RequireChildren } from "./types";

import { cn } from "./utils";

const Hero = forwardRef<
  HTMLDivElement,
  RequireChildren<HTMLDivElement> & { backgroundImage?: string }
>(({ backgroundImage, className, ...props }, ref) => {
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
});

Hero.displayName = "Hero";

const HeroContent = forwardRef<HTMLDivElement, RequireChildren<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cn("dsy-hero-content", className)} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

HeroContent.displayName = "HeroContent";

const HeroTitle = forwardRef<HTMLHeadingElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <h1 className="text-pretty text-5xl font-bold lg:text-7xl" ref={ref}>
        {children}
      </h1>
    );
  },
);

HeroTitle.displayName = "HeroTitle";

const HeroOverlay = forwardRef<HTMLDivElement>((_props, ref) => (
  <div className="dsy-hero-overlay bg-opacity-60" ref={ref} />
));

HeroOverlay.displayName = "HeroOverlay";

const HeroBadges = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <div className="flex w-full justify-end gap-2" ref={ref}>
        {children}
      </div>
    );
  },
);

HeroBadges.displayName = "HeroBadges";

export { Hero, HeroBadges, HeroContent, HeroOverlay, HeroTitle };
