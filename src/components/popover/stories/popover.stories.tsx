import React from "react";
import { Meta, Story } from "@storybook/react";

import { Popover, PopoverProps } from "..";
import { Flex } from "../../flex";
import { Box } from "../../box";
import { IconButton } from "../../buttons/IconButton";
import { BiDotsVertical } from "react-icons/bi";

export default {
  title: "Components/Popover",
  component: Popover,
} as Meta;

const Template: Story<PopoverProps> = (args) => (
  <Flex.Container
    spacing={8}
    justifyContent="center"
    alignItems="center"
    h="100vh"
  >
    <Flex.Item>
      <Popover {...args} />
    </Flex.Item>
  </Flex.Container>
);

export const PopoverClick = Template.bind({});
PopoverClick.args = {
  children: <IconButton icon={BiDotsVertical} />,
  placement: "top",
  content: (
    <Box py={1} px={3}>
      Teste
    </Box>
  ),
};
