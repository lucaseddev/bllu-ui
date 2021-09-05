import React from "react";
import { Meta, Story } from "@storybook/react";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import "../../../theme/global";
import { BiSearch } from "react-icons/bi";

import { Icon } from "../../icon";
import { Select as SelectComponent, SelectProps } from "../Select";

export default {
  title: "Components/Select",
  component: SelectComponent,
} as Meta;

const Template: Story<SelectProps> = (args) => (
  <SelectComponent {...args} />
);

export const Select = Template.bind({});
Select.args = {
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
  disabled: true,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  placeholder: "Selecione uma fruta...",
  options: [
    { label: "Maçã", value: 1 },
    { label: "Banana", value: 2 },
    { label: "Goiaba", value: 3 },
    { label: "Abacaxi", value: 4 },
    { label: "Siriguela", value: 5 },
  ],
  isLoading: true,
};
