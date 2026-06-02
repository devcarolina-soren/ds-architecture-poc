import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Shared UI/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "primary"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"]
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
