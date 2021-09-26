import React from "react";
import { Meta, Story } from "@storybook/react";

import { Flex, FlexProps } from "..";
import { Box } from "../../box";

export default {
  title: "Components/FlexLayout",
  component: Flex,
} as Meta;

export const FlexContainer: Story<FlexProps> = (args) => (
  <Flex container>
    <Flex item xs={4}>
      <Box p={3}>This is a flex item</Box>
    </Flex>
    <Flex item xs={4}>
      <Box p={3}>This is a second flex item</Box>
    </Flex>
    <Flex item xs={4}>
      <Box p={3}>This is a third flex item</Box>
    </Flex>
    <Flex item xs={4}>
      <Box p={3}>This is a fourth flex item</Box>
    </Flex>

    <Flex container item>
      <Flex item>
        <Flex container direction={"column"} alignItems={"stretch"}>
          <Flex item>
            <Box>Nested flex item 1</Box>
          </Flex>
          <Flex item>
            <Box>Nested flex item 2</Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex item>
        <Box>Nested flex item 2</Box>
      </Flex>
    </Flex>
  </Flex>
);
