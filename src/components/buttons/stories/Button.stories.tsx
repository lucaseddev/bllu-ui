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
import { MD } from "../../../types/sizes";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import { BiBell, BiSearch } from "react-icons/bi";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  appearance: PRIMARY,
  size: MD,
};

export const PrimaryDanger = Template.bind({});
PrimaryDanger.args = {
  children: "Primary Danger",
  appearance: PRIMARY,
  size: MD,
  danger: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  appearance: SECONDARY,
  size: MD,
};

export const SecondaryDanger = Template.bind({});
SecondaryDanger.args = {
  children: "Secondary Danger",
  appearance: SECONDARY,
  size: MD,
  danger: true,
};

export const Link = Template.bind({});
Link.args = {
  children: "Link",
  appearance: LINK,
  size: MD,
};

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  children: "Left Icon",
  appearance: PRIMARY,
  size: MD,
  beforeIcon: BiSearch,
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  children: "Right Icon",
  appearance: PRIMARY,
  size: MD,
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
