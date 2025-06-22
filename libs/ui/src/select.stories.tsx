import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Select",
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </>
    ),
  },
};

export const Sizes: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <Select {...args} size="xs">
          <option value="xs">Extra Small</option>
        </Select>
        <Select {...args} size="sm">
          <option value="sm">Small</option>
        </Select>
        <Select {...args} size="default">
          <option value="md">Medium (Default)</option>
        </Select>
        <Select {...args} size="lg">
          <option value="lg">Large</option>
        </Select>
        <Select {...args} size="xl">
          <option value="xl">Extra Large</option>
        </Select>
      </div>
    );
  },
};
