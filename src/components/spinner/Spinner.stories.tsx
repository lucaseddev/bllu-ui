import React from "react";
import { Meta, Story } from "@storybook/react";
import { Spinner, SpinnerProps } from "./";
import { themeLight } from "../../theme";
import { ThemeProvider } from "../../contexts";
import { SMALL, MEDIUM, LARGE } from "../../types/sizes";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = (args) => (
  <ThemeProvider theme={themeLight}>
    <Spinner {...args} />
  </ThemeProvider>
);

export const LoadingSpinner = Template.bind({});
LoadingSpinner.args = {
  size: MEDIUM,
};
