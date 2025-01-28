import type { Meta, StoryObj } from "@storybook/react";

import { Hero, HeroBadges, HeroContent, HeroOverlay, HeroTitle } from "./hero";

const meta = {
  args: { className: "min-h-[30rem]" },
  component: Hero,
  parameters: {
    layout: "padded",
  },
  subcomponents: {
    // TODO: remove casting when https://github.com/storybookjs/storybook/issues/23170 is closed
    HeroBadges: HeroBadges as React.ComponentType<unknown>,
    HeroContent: HeroContent as React.ComponentType<unknown>,
    HeroOverlay: HeroOverlay as React.ComponentType<unknown>,
    HeroTitle: HeroTitle as React.ComponentType<unknown>,
  },
  title: "Hero",
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnlyContent = {
  args: {
    children: (
      <>
        <HeroOverlay />
        <HeroContent>
          <p>I am a Hero With Only Content.</p>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;

export const WithTitle = {
  args: {
    children: (
      <>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Hero</HeroTitle>
          <p>I have a title.</p>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;

export const WithCoverImage = {
  args: {
    backgroundImage: "https://placehold.co/500/black/pink",
    children: (
      <>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Hero</HeroTitle>
          <p>I have a cover image.</p>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;

export const WithBadges = {
  args: {
    backgroundImage: "https://placehold.co/500/black/pink",
    children: (
      <>
        <HeroOverlay />
        <HeroContent>
          <HeroBadges>
            <span className="dsy-badge dsy-badge-outline">badge</span>
          </HeroBadges>
          <HeroTitle>Hero</HeroTitle>
          <p>I have a cover image.</p>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;
