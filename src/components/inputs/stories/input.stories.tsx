import React from "react";
import { Meta, Story } from "@storybook/react";
import { InputText } from "../";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import { InputTextProps } from "../InputText";
import "../../../theme/global";
import { BiSearch } from "react-icons/bi";

import { Icon } from "../../icon";

export default {
  title: "Components/Input",
  component: InputText,
} as Meta;

const Template: Story<InputTextProps> = (args) => (
  <InputText {...args} />
);

export const TextInput = Template.bind({});
TextInput.args = {
  placeholder: "This is a placeholder...",
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder: "This is a disabled input...",
  disabled: true,
};

export const InvalidInput = Template.bind({});
InvalidInput.args = {
  placeholder: "This is a invalid input...",
  isInvalid: true,
};

export const InputPrefix = Template.bind({});
InputPrefix.args = {
  placeholder: "This is input with prefix...",
  prefix: "$",
};

export const InputSuffix = Template.bind({});
InputSuffix.args = {
  placeholder: "This is input with prefix...",
  suffix: <Icon size={18} icon={BiSearch} />,
};

export const InputIsLoading = Template.bind({});
InputIsLoading.args = {
  placeholder: "This is loading...",
  isLoading: true,
};
