import React from "react";
import { Meta, Story } from "@storybook/react";
import "../../../theme/global";

import {
  ComboBoxField as ComboBoxFieldComponent,
  ComboBoxFieldProps,
} from "..";

export default {
  title: "Components/ComboBoxField",
  component: ComboBoxFieldComponent,
} as Meta;

const Template: Story<ComboBoxFieldProps> = (args) => (
  <ComboBoxFieldComponent {...args} />
);

export const Label = Template.bind({});
Label.args = {
  label: "ComboBox Label",
  placeholder: "Selecione uma fruta...",
  name: "fruits",
  options: [
    { label: "Maçã", value: "1" },
    { label: "Banana", value: "2" },
    { label: "Goiaba", value: "3" },
    { label: "Abacaxi", value: "4" },
    { label: "Siriguela", value: "5" },
  ],
};

export const LabelAndDescription = Template.bind({});
LabelAndDescription.args = {
  label: "ComboBox Label",
  description: "This is a description",
  placeholder: "Selecione uma fruta...",
  name: "fruits",
  options: [
    { label: "Maçã", value: "1" },
    { label: "Banana", value: "2" },
    { label: "Goiaba", value: "3" },
    { label: "Abacaxi", value: "4" },
    { label: "Siriguela", value: "5" },
  ],
};

export const InvalidMsg = Template.bind({});
InvalidMsg.args = {
  label: "ComboBox Label",
  description: "This is a description",
  invalidMsg: "This is a invalid message!",
  isInvalid: true,
  placeholder: "Selecione uma fruta...",
  name: "fruits",
  options: [
    { label: "Maçã", value: "1" },
    { label: "Banana", value: "2" },
    { label: "Goiaba", value: "3" },
    { label: "Abacaxi", value: "4" },
    { label: "Siriguela", value: "5" },
  ],
};
