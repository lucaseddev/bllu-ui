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
  ],
};
