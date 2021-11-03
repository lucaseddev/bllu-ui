import React from "react";
import { Meta, Story } from "@storybook/react";

import { Text } from "../";
import { TextProps } from "../text";

export default {
  title: "Components/Text",
  component: Text,
} as Meta;

export const Basic: Story<TextProps> = (args: TextProps) => (
  <Text {...args}>In love with programming</Text>
);

export const FontSizes: Story<TextProps> = ({
  size,
  ...rest
}: TextProps) => (
  <>
    <Text {...rest} size="6xl">
      In love with programming (6xl)
    </Text>
    <Text {...rest} size="5xl">
      In love with programming (5xl)
    </Text>
    <Text {...rest} size="4xl">
      In love with programming (4xl)
    </Text>
    <Text {...rest} size="3xl">
      In love with programming (3xl)
    </Text>
    <Text {...rest} size="2xl">
      In love with programming (2xl)
    </Text>
    <Text {...rest} size="xl">
      In love with programming (xl)
    </Text>
    <Text {...rest} size="lg">
      In love with programming (lg)
    </Text>
    <Text {...rest} size="md">
      In love with programming (md)
    </Text>
    <Text {...rest} size="sm">
      In love with programming (sm)
    </Text>
    <Text {...rest} size="xs">
      In love with programming (xs)
    </Text>
  </>
);
