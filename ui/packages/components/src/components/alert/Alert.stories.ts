import type { Meta, StoryObj } from "@storybook/vue3";

import { VAlert } from ".";

const meta: Meta<typeof VAlert> = {
  title: "Alert",
  component: VAlert,
  tags: ["autodocs"],
  render: (args) => ({
    components: { VAlert },
    setup() {
      return { args };
    },
    template: `<VAlert v-bind="args"></VAlert>`,
  }),
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["default", "success", "info", "warning", "error"],
    },
    closable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VAlert>;

export const Default: Story = {
  args: {
    type: "default",
    title: "default",
    description: "Blog",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    title: "success",
    description: "Blog",
  },
};

export const Info: Story = {
  args: {
    type: "info",
    title: "info",
    description: "Blog",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "warning",
    description: "Blog",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "error",
    description: "Blog",
  },
};
