import React from "react";
import { Meta, Story } from "@storybook/react";

import { Checkbox, CheckboxProps } from "..";
import { useEffect, useState } from "@storybook/addons";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta;

export const checkbox = (args: CheckboxProps) => (
  <React.Fragment>
    <Checkbox label="Default" {...args} />
    <Checkbox label="Default checked" defaultChecked {...args} />
    <Checkbox
      label="Default checked disabled"
      defaultChecked
      disabled
      {...args}
    />
    <Checkbox label="Default disabled" disabled {...args} />
  </React.Fragment>
);
