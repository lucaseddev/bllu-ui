import React from "react";
import { Meta, Story } from "@storybook/react";
import { InputTextField } from "..";
import "../../../theme/global";
import { BiSearch } from "react-icons/bi";

import { Icon } from "../../icon";
import { InputTextFieldProps } from "../InputTextField";

export default {
  title: "Components/InputTextField",
  component: InputTextField,
} as Meta;

const Template: Story<InputTextFieldProps> = (args) => (
  <InputTextField {...args} />
);

export const FieldLabel = Template.bind({});
FieldLabel.args = {
  placeholder: "This is Input with Label...",
  label: "Input Label",
};

export const FieldDescription = Template.bind({});
FieldDescription.args = {
  placeholder: "This is Input with Label...",
  label: "Input Label",
  description: "This is an input with description...",
};

export const FieldInvalid = Template.bind({});
FieldInvalid.args = {
  placeholder: "This is Input with invalid state...",
  label: "Input Label",
  description: "This is an input with description...",
  isInvalid: true,
  invalidMsg: "This field is required.",
};
