import { pxStep, remStep, StepSize } from "helpers/scale";
import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import React, { useState } from "react";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

export interface InputTextProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "type" | "className"
  > {
  width?: string | number;
  size?: SMALL | MEDIUM | LARGE;

  name?: string;
  placeholder?: string;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;

  className?:
    | StyleObject
    | StyleFunction<Omit<InputTextProps, "className" | "onChange">>;

  isInvalid?: boolean;
  disabled?: boolean;
  required?: boolean;

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | string;
}

const sizes = {
  sm: { height: pxStep(4) },
  md: { height: pxStep(5) },
  lg: { height: pxStep(6), fontSize: remStep(7, StepSize.REM125) },
};

export const InputStyle: StyleFunction<InputTextProps> = ({
  theme,
  size,
  width,
}) => {
  return {
    ...sizes[size || MEDIUM],
    border: `1px solid ${theme.colors.defaultStroke}`,
    borderRadius: pxStep(1, StepSize.PX4),
    width: width || "fit-content",

    paddingLeft: pxStep(2),
    paddingRight: pxStep(2),

    transition: `border 0.2s, box-shadow 0.2s, background 0.2s ${theme.easings.inOutCubic}`,

    ":focus": {
      boxShadow: `0px 0px 1px 2px ${theme.colors.primary}45`,
      borderColor: `${theme.colors.primary}a3`,
    },

    ":disabled": {
      cursor: "not-allowed",
    },

    ":focus-visible": {
      outline: "none",
    },

    '&[aria-invalid="true"]': {
      borderColor: `${theme.colors.danger}a3`,

      "&:focus, &:focus-within": {
        boxShadow: `0px 0px 1px 2px ${theme.colors.danger}45`,
      },
    },
  };
};

export const InputText = React.forwardRef(function InputText(
  props: InputTextProps,
  ref?: React.Ref<HTMLInputElement>
) {
  const {
    className,
    size = MEDIUM,
    width,
    isInvalid = false,
    prefix,
    suffix,
    ...rest
  } = props;

  const inputStyle = useStyles([InputStyle], { width, size });

  return (
    <input
      aria-invalid={isInvalid}
      aria-required={props.required}
      aria-disabled={props.disabled}
      className={inputStyle}
      ref={ref}
      {...rest}
    />
  );
});
