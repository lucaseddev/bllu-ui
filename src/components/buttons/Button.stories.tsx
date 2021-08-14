import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Button,
  ButtonProps,
  LINK,
  PRIMARY,
  SECONDARY,
} from "./Button";
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
Primary.args = { text: "Primary", appearance: PRIMARY, size: MEDIUM };

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  text: "Secondary",
  appearance: SECONDARY,
  size: MEDIUM,
};

export const Link = Template.bind({});
Link.args = {
  text: "Link",
  appearance: LINK,
  size: MEDIUM,
};
