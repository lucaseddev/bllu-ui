import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: "Primary" };

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  label: "Secondary",
  size: "large",
};
