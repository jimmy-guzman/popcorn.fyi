import type { HTMLAttributes, ReactNode } from "react";

import { forwardRef } from "react";

import { cn } from "./utils";

interface HTMLElementWithChildren<T> extends HTMLAttributes<T> {
  children: ReactNode;
}

const Hero = forwardRef<
  HTMLDivElement,
  HTMLElementWithChildren<HTMLDivElement> & { backgroundImage?: string }
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

const HeroContent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        className="dsy-hero-content text-neutral-content text-center"
        ref={ref}
      >
        <div className="flex flex-col items-center gap-5">{children}</div>
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

const HeroOverlay = forwardRef<HTMLDivElement>((_props, ref) => {
  return <div className="dsy-hero-overlay bg-opacity-60" ref={ref} />;
});

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
