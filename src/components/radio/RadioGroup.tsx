import cx from "classnames";
import { Box } from "components/box";
import { remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { LG, MD, SM } from "types/sizes";
import { Radio } from "./Radio";

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  value?: string | number;
  defaultValue?: string | number;

  options: RadioOption[];
  size: SM | MD | LG;
  required?: boolean;

  name: string;

  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroupStyle = styled({
  "& > span": {
    fontSize: remStep(7, StepSize.REM125),
    fontWeight: 600,
  },
});

export const RadioGroup = React.memo(
  React.forwardRef(function (
    props: RadioGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const {
      label,
      value,
      defaultValue,
      options,
      onChange,
      required = false,
      size = "sm",
    } = props;

    const name = props.name || "RadioGroup";
    const selected = value || defaultValue || props.options[0].value;

    return (
      <Box
        ref={ref}
        className={cx(RadioGroupStyle)}
        aria-label={label}
        role="group"
      >
        <span>{label}</span>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            required={required}
            disabled={option.disabled}
            checked={selected === option.value}
            onChange={onChange}
            name={name}
            size={size}
          />
        ))}
      </Box>
    );
  })
);
