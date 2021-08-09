import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps, SECONDARY } from "./Button";
import { MEDIUM } from "../../types/sizes";
import { ThemeProvider } from "../../contexts";
import { themeLight } from "../../theme";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ThemeProvider theme={themeLight}>
    <Button {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = { text: "Primary" };

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  text: "Secondary",
  type: SECONDARY,
  size: MEDIUM,
};
