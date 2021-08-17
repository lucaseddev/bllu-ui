import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Button,
  ButtonProps,
  LINK,
  PRIMARY,
  SECONDARY,
} from "../Button";
import { IconButton, IconButtonProps } from "../IconButton";
import { MEDIUM } from "../../../types/sizes";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import { BiBell, BiSearch } from "react-icons/bi";

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
Primary.args = {
  children: "Primary",
  appearance: PRIMARY,
  size: MEDIUM,
};

export const PrimaryDanger = Template.bind({});
PrimaryDanger.args = {
  children: "Primary Danger",
  appearance: PRIMARY,
  size: MEDIUM,
  danger: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  appearance: SECONDARY,
  size: MEDIUM,
};

export const SecondaryDanger = Template.bind({});
SecondaryDanger.args = {
  children: "Secondary Danger",
  appearance: SECONDARY,
  size: MEDIUM,
  danger: true,
};

export const Link = Template.bind({});
Link.args = {
  children: "Link",
  appearance: LINK,
  size: MEDIUM,
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  children: "Left Icon",
  appearance: PRIMARY,
  size: MEDIUM,
  beforeIcon: BiSearch,
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  children: "Right Icon",
  appearance: PRIMARY,
  size: MEDIUM,
  afterIcon: BiSearch,
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Is Loading",
  isLoading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  disabled: true,
};
