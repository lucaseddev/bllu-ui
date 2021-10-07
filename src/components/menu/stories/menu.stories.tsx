import React from "react";
import { Meta, Story } from "@storybook/react";

import { Menu, MenuProps } from "..";
import { BiEdit, BiMove, BiShare, BiTrash } from "react-icons/bi";

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
      <Menu.Group label="Actions">
        <Menu.Item icon={BiEdit}>Rename</Menu.Item>
        <Menu.Item icon={BiMove}>Move...</Menu.Item>
        <Menu.Item icon={BiShare}>Share...</Menu.Item>
      </Menu.Group>
      <Menu.Group label="Destructive">
        <Menu.Item icon={BiTrash} intention="danger">
          Delete
        </Menu.Item>
      </Menu.Group>
    </React.Fragment>
  ),
};
