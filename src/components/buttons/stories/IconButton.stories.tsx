import React from "react";
import { Meta, Story } from "@storybook/react";
import { BiSearch } from "react-icons/bi";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import { IconButton, IconButtonProps } from "../IconButton";

export default {
  title: "Components/IconButton",
  component: IconButton,
} as Meta;

export const IconOnly: Story<IconButtonProps> = (args) => {
  return (
    <ThemeProvider theme={themeLight}>
      <IconButton {...args} icon={BiSearch} />
    </ThemeProvider>
  );
};
