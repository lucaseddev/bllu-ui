import React from "react";
import { Meta, Story } from "@storybook/react";

import { RadioGroup, RadioGroupProps } from "..";
import { useEffect, useState } from "@storybook/addons";

export default {
  title: "Components/Radio",
  component: RadioGroup,
} as Meta;

export const RadioGroups = (args: RadioGroupProps) => {
  const [value, setValue] = useState("apple");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

RadioGroups.args = {
  label: "Fruits",
  name: "fruits",
  options: [
    { label: "Apple", value: "apple" },
    { label: "Orange", value: "orange" },
    { label: "Watermelon", value: "watermelon" },
    { label: "grapes", value: "Grapes", disabled: true },
  ],
};
