import React from "react";
import { Meta, Story } from "@storybook/react";

import { Popover, PopoverProps } from "..";
import { Flex } from "../../flex";
import { Box } from "../../box";
import { IconButton } from "../../buttons/IconButton";
import { BiDotsVertical } from "react-icons/bi";
import { Button } from "../../buttons/Button";

export default {
  title: "Components/Popover",
  component: Popover,
} as Meta;

const Template: Story<PopoverProps> = (args) => (
  <Box h="100vh">
    <Flex.Container
      h="100%"
      spacing={8}
      justifyContent="center"
      alignItems="center"
    >
      <Flex.Item>
        <Popover {...args} />
      </Flex.Item>
    </Flex.Container>
  </Box>
);

export const Click = Template.bind({});
Click.args = {
  children: <IconButton icon={BiDotsVertical} />,
  placement: "top",
  content: (close) => (
    <React.Fragment>
      <Button
        onClick={(e) => {
          console.log("button clicked");
          close();
        }}
      >
        Click to close
      </Button>
    </React.Fragment>
  ),
  trigger: "click",
};

export const Hover = Template.bind({});
Hover.args = {
  children: <Box>Hover over me!</Box>,
  placement: "top",
  content: (close) => <Button onClick={close}>Click to close</Button>,
  trigger: "hover",
};
