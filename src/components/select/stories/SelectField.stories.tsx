import React from "react";
import { Meta, Story } from "@storybook/react";
import "../../../theme/global";

import {
  SelectField as SelectFieldComponent,
  SelectFieldProps,
} from "../SelectField";

export default {
  title: "Components/SelectField",
  component: SelectFieldComponent,
} as Meta;

const Template: Story<SelectFieldProps> = (args) => (
  <SelectFieldComponent {...args} />
);

export const Label = Template.bind({});
Label.args = {
  label: "Label Select",
  name: "fruits",
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
};

export const LabelAndDescription = Template.bind({});
LabelAndDescription.args = {
  label: "Label Select",
  description: "Description of select field",
  name: "fruits",
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
};

export const InvalidField = Template.bind({});
InvalidField.args = {
  label: "Label Select",
  description: "Description of select field",
  name: "fruits",
  isInvalid: true,
  invalidMsg: "This field is required.",
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
};
