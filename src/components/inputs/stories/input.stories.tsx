import React from "react";
import { Meta, Story } from "@storybook/react";
import { InputText } from "../";
import { ThemeProvider } from "../../../contexts";
import { themeLight } from "../../../theme";
import { InputTextProps } from "../InputText";

export default {
  title: "Components/Input",
  component: InputText,
} as Meta;

const Template: Story<InputTextProps> = (args) => (
  <ThemeProvider theme={themeLight}>
    <InputText {...args} />
  </ThemeProvider>
);

export const TextInput = Template.bind({});
TextInput.args = {};
