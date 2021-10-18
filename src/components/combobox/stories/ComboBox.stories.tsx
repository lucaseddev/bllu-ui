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
    { label: "Maçã", value: "1" },
    { label: "Banana", value: "2" },
    { label: "Goiaba", value: "3" },
    { label: "Abacaxi", value: "4" },
    { label: "Siriguela", value: "5" },
  ],
};

export const ComboBoxGroups = Template.bind({});
ComboBoxGroups.args = {
  placeholder: "Select an option...",
  options: [
    {
      label: "Fruits",
      options: [
        { label: "Bananas", value: "1" },
        { label: "Apples", value: "2" },
      ],
    },
    { label: "Rice", value: "3" },
    {
      label: "Snacks",
      options: [{ label: "Cookies", value: "4" }],
    },
    {
      label: "Ice Creams",
      options: [
        { label: "Chocolate", value: "5" },
        { label: "Vanilla", value: "6" },
      ],
    },
  ],
};
