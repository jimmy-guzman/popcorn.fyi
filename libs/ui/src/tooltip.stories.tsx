import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Tooltip, TooltipContent } from "./tooltip";

const meta = {
  component: Tooltip,
  subcomponents: {
    TooltipContent,
  },
  title: "Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple = {
  args: {
    children: <Button>Tooltip</Button>,
    content: "An amazing button.",
  },
} satisfies Story;

export const WithContent = {
  args: {
    children: (
      <>
        <Button>Tooltip</Button>
        <TooltipContent>
          <div className="-rotate-10 animate-bounce text-xl font-black text-pink-400">
            Wow!
          </div>
        </TooltipContent>
      </>
    ),
  },
} satisfies Story;
