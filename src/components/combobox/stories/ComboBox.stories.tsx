import React from "react";
import { Meta, Story } from "@storybook/react";
import "../../../theme/global";

import { ComboBox as ComboBoxComponent, ComboBoxProps } from "..";

export default {
  title: "Components/ComboBox",
  component: ComboBoxComponent,
} as Meta;

const Template: Story<ComboBoxProps> = (args) => (
  <ComboBoxComponent {...args} />
);

export const ComboBox = Template.bind({});
ComboBox.args = {
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
};
