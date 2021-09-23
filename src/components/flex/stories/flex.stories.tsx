import React from "react";
import { Meta, Story } from "@storybook/react";

import { Flex, FlexProps } from "..";

export default {
  title: "Components/FlexLayout",
  component: Flex,
} as Meta;

export const FlexContainer: Story<FlexProps> = (args) => (
  <Flex container justifyContent="space-between" spacing={3}>
    <Flex item>This is a flex item</Flex>
    <Flex item>This is a second flex item</Flex>
    <Flex item>This is a second flex item</Flex>
  </Flex>
);
