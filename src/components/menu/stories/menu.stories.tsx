import React from "react";
import { Meta, Story } from "@storybook/react";

import { Menu, MenuProps, MenuItem, MenuGroup } from "..";
import { Popover } from "../../popover";
import { Button, IconButton } from "../../buttons";
import {
  BiDotsVertical,
  BiEdit,
  BiMove,
  BiShare,
  BiTrash,
} from "react-icons/bi";

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
      <MenuItem>Menu item 1</MenuItem>
      <MenuItem>Menu item 2</MenuItem>
      <MenuItem>Menu item 3</MenuItem>
      <MenuItem>Menu item 4</MenuItem>
    </React.Fragment>
  ),
};

export const Groups = Template.bind({});
Groups.args = {
  children: (
    <React.Fragment>
      <MenuGroup label="Actions">
        <MenuItem icon={BiEdit}>Rename</MenuItem>
        <MenuItem icon={BiMove}>Move...</MenuItem>
        <MenuItem icon={BiShare}>Share...</MenuItem>
      </MenuGroup>
      <MenuGroup label="Destructive">
        <MenuItem icon={BiTrash} intention="danger">
          Delete
        </MenuItem>
      </MenuGroup>
    </React.Fragment>
  ),
};

export const WithDisabledItems = Template.bind({});
WithDisabledItems.args = {
  children: (
    <React.Fragment>
      <MenuGroup label="Actions">
        <MenuItem icon={BiEdit}>Rename</MenuItem>
        <MenuItem icon={BiMove}>Move...</MenuItem>
        <MenuItem icon={BiShare}>Share...</MenuItem>
      </MenuGroup>
      <MenuGroup label="Destructive">
        <MenuItem icon={BiTrash} intention="danger" disabled>
          Delete
        </MenuItem>
      </MenuGroup>
    </React.Fragment>
  ),
};

export const DropdownMenu = (args: MenuProps) => (
  <Popover
    content={(close) => (
      <Menu w="200px" onClick={close} {...args}>
        <MenuGroup label="Actions">
          <MenuItem icon={BiEdit}>Rename</MenuItem>
          <MenuItem icon={BiMove}>Move...</MenuItem>
          <MenuItem icon={BiShare}>Share...</MenuItem>
        </MenuGroup>
        <MenuGroup label="Destructive">
          <MenuItem icon={BiTrash} intention="danger">
            Delete
          </MenuItem>
        </MenuGroup>
      </Menu>
    )}
  >
    <IconButton icon={BiDotsVertical} />
  </Popover>
);
