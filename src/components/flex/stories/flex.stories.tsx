import React from "react";
import { Meta, Story } from "@storybook/react";

import { Flex as FlexLayout, FlexProps } from "..";
import { Box } from "../../box";

export default {
  title: "Components/FlexLayout",
  component: FlexLayout.Container,
} as Meta;

const { Item, Container } = FlexLayout;

export const Flex: Story<FlexProps> = (args) => (
  <Container>
    <Item xs={4}>
      <Box p={3}>This is a flex item</Box>
    </Item>
    <Item xs={4}>
      <Box p={3}>This is a second flex item</Box>
    </Item>
    <Item xs={4}>
      <Box p={3}>This is a third flex item</Box>
    </Item>
    <Item xs={4}>
      <Box p={3}>This is a fourth flex item</Box>
    </Item>

    <Item>
      <Container>
        <Item>
          <Container direction="column" alignItems="stretch">
            <Item>
              <Box>Nested flex item 1</Box>
            </Item>
            <Item>
              <Box>Nested flex item 2</Box>
            </Item>
          </Container>
        </Item>
        <Item>
          <Box>Nested flex item 1</Box>
        </Item>
      </Container>
    </Item>
  </Container>
);
