import React from "react";
import { Meta, Story } from "@storybook/react";

import { SwitchField, SwitchFieldProps } from "..";
import { Popover } from "../../popover";
import { Button, IconButton } from "../../buttons";
import {
  BiDotsVertical,
  BiEdit,
  BiMove,
  BiShare,
  BiTrash,
} from "react-icons/bi";
import { template } from "@babel/core";

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
};
