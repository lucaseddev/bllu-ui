import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps, SECONDARY } from "./Button";
import { MEDIUM } from "../../types/sizes";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

import { LightTheme } from "../../theme/light";
import ThemeProvider from "cxs/ThemeProvider";

const Template: Story<ButtonProps> = (args) => (
  <ThemeProvider theme={LightTheme}>
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
