import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardImage, CardTitle } from "./card";

const meta = {
  component: Card,
  subcomponents: {
    CardContent,
    CardImage,
    CardTitle,
  },
  title: "Card",
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnlyContent = {
  args: {
    children: <CardContent>I am a Card With Only Content</CardContent>,
  },
} satisfies Story;

export const WithTitle = {
  args: {
    children: (
      <CardContent>
        <CardTitle>I am a Card With a Title</CardTitle>
      </CardContent>
    ),
  },
} satisfies Story;

export const WithImage = {
  args: {
    children: (
      <>
        <CardImage alt="placeholder" src="https://placehold.co/200" />
        <CardContent>
          <CardTitle>I am a Card With an Image</CardTitle>
        </CardContent>
      </>
    ),
  },
} satisfies Story;
