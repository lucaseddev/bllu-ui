import React from "react";
import { Meta, Story } from "@storybook/react";

import { Switch, SwitchProps } from "..";
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
  title: "Components/Switch",
  component: Switch,
} as Meta;

const Template: Story<SwitchProps> = (args: SwitchProps) => (
  <Switch {...args} />
);

export const Default = Template.bind({});
Default.args = {};
