import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";
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

export const Centered = {
  args: {
    children: (
      <HeroContent>
        <div className="max-w-md">
          <HeroTitle>Hello there</HeroTitle>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </HeroContent>
    ),
  },
} satisfies Story;

export const WithFigure = {
  args: {
    children: (
      <HeroContent className="flex-col lg:flex-row">
        <img
          alt="placeholder"
          className="max-w-sm rounded-lg shadow-2xl"
          src="https://placehold.co/500"
        />
        <div>
          <HeroTitle>Box Office News!</HeroTitle>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </HeroContent>
    ),
  },
} satisfies Story;

export const WithCoverImage = {
  args: {
    backgroundImage: "https://placehold.co/500",
    children: (
      <>
        <HeroOverlay />
        <HeroContent className="text-neutral-content text-center">
          <div className="max-w-md">
            <HeroTitle>Hello there</HeroTitle>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;

export const WithBadges = {
  args: {
    backgroundImage: "https://placehold.co/500",
    children: (
      <>
        <HeroOverlay />
        <HeroContent className="text-neutral-content text-center">
          <div className="max-w-md">
            <HeroBadges>
              <Badge variant="outline">badge</Badge>
            </HeroBadges>
            <HeroTitle>Hello there</HeroTitle>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </HeroContent>
      </>
    ),
  },
} satisfies Story;
