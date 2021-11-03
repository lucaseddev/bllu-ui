import React from "react";
import { Meta, Story } from "@storybook/react";

import { Heading, HeadingProps } from "../";

export default {
  title: "Components/Heading",
  component: Heading,
} as Meta;

export const Basic: Story<HeadingProps> = (args: HeadingProps) => (
  <Heading {...args}>In love with programming</Heading>
);

export const FontSizes: Story<HeadingProps> = ({
  size,
  ...rest
}: HeadingProps) => (
  <>
    <Heading {...rest} size="4xl">
      In love with programming (4xl)
    </Heading>
    <Heading {...rest} size="3xl">
      In love with programming (3xl)
    </Heading>
    <Heading {...rest} size="2xl">
      In love with programming (2xl)
    </Heading>
    <Heading {...rest} size="xl">
      In love with programming (xl)
    </Heading>
    <Heading {...rest} size="lg">
      In love with programming (lg)
    </Heading>
    <Heading {...rest} size="md">
      In love with programming (md)
    </Heading>
    <Heading {...rest} size="sm">
      In love with programming (sm)
    </Heading>
    <Heading {...rest} size="xs">
      In love with programming (xs)
    </Heading>
  </>
);
