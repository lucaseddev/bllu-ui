import React from "react";
import { Meta, Story } from "@storybook/react";

import { Flex, FlexProps } from "..";
import { Box } from "../../box";

export default {
  title: "Components/FlexLayout",
  component: Flex,
} as Meta;

export const FlexContainer: Story<FlexProps> = (args) => (
  <Flex container spacing={1}>
    <Flex item>
      <Box>This is a flex item</Box>
    </Flex>
    <Flex item>
      <Box>This is a second flex item</Box>
    </Flex>
    <Flex item>
      <Box>This is a third flex item</Box>
    </Flex>
  </Flex>
);
