import React from "react";
import { Meta, Story } from "@storybook/react";

import { SwitchField, SwitchFieldProps } from "..";

export default {
  title: "Components/SwitchField",
  component: SwitchField,
} as Meta;

const Template: Story<SwitchFieldProps> = (
  args: SwitchFieldProps
) => <SwitchField {...args} />;

export const Label = Template.bind({});
Label.args = {
  name: "switch",
  label: "Usar funcionalidade",
};

export const LabelAndDescription = Template.bind({});
LabelAndDescription.args = {
  name: "switch",
  label: "Usar funcionalidade",
  description: "Descrição sobre a funcionalidade",
  checked: true,
};
