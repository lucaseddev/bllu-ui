import React from "react";
import { Meta, Story } from "@storybook/react";

import { Menu, MenuProps } from "..";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = (args: MenuProps) => (
  <Menu {...args} />
);

export const Items = Template.bind({});
Items.args = {
  children: (
    <React.Fragment>
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Item>Menu item 2</Menu.Item>
      <Menu.Item>Menu item 3</Menu.Item>
      <Menu.Item>Menu item 4</Menu.Item>
    </React.Fragment>
  ),
};

export const Groups = Template.bind({});
Groups.args = {
  children: (
    <React.Fragment>
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Group label="Group Label 1">
        <Menu.Item>Grouped item 1</Menu.Item>
      </Menu.Group>
      <Menu.Group label="Group Label 2">
        <Menu.Item>Grouped item 1</Menu.Item>
        <Menu.Item>Grouped item 2</Menu.Item>
      </Menu.Group>
    </React.Fragment>
  ),
};
