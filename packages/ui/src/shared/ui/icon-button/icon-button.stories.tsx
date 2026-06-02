import arrowRightIcon from "@ast/icons/arrow-right.svg";
import closeIcon from "@ast/icons/close.svg";
import searchIcon from "@ast/icons/search.svg";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./icon-button";

const iconOptions = {
  "arrow-right": arrowRightIcon,
  close: closeIcon,
  search: searchIcon
} as const;

const meta = {
  title: "Shared UI/IconButton",
  component: IconButton,
  args: {
    icon: searchIcon,
    label: "Search",
    variant: "primary"
  },
  argTypes: {
    icon: {
      control: "select",
      mapping: iconOptions,
      options: Object.keys(iconOptions)
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"]
    }
  }
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
