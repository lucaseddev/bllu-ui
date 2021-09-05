import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import React from "react";
import { Select, SelectProps } from "./Select";
import { useUIDSeed } from "react-uid";
import { pxStep, remStep, StepSize } from "helpers/scale";

export interface SelectFieldProps extends SelectProps {
  label: string | React.ReactNode;
  name: string;
  description?: string;

  invalidMsg?: string;

  className?:
    | StyleObject
    | StyleFunction<Omit<SelectFieldProps, "className" | "onChange">>;
}

const WrapperStyle: StyleFunction<SelectFieldProps> = ({
  theme,
}) => ({
  display: "flex",
  flexDirection: "column",

  "& > label": {
    marginBottom: pxStep(1, StepSize.PX4),
    fontSize: remStep(7, StepSize.REM125),
    fontWeight: 600,
  },

  "& > p": {
    marginTop: 0,
    marginBottom: pxStep(1, StepSize.PX4),
    fontSize: remStep(3, StepSize.REM25),
    color: theme.colors.onSurface,
  },

  "& > span": {
    color: theme.colors.danger,
    marginTop: pxStep(1, StepSize.PX4),
    fontSize: remStep(3, StepSize.REM25),
  },
});

export const SelectField = React.forwardRef(function SelectField(
  props: SelectFieldProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    invalidMsg,
    className,
    label,
    description,
    id,
    ...rest
  } = props;

  if (!props.name) {
    console.warn(
      '"Name" prop is required for SelectField component!'
    );
    throw new Error(
      '"Name" prop is required for SelectField component!'
    );
  }

  const uniqueId = id || useUIDSeed()(props.name);

  const wrapperStyle = useStyles([WrapperStyle, className || ""]);

  return (
    <div className={wrapperStyle}>
      <label htmlFor={uniqueId}>{label}</label>
      {description && <p>{description}</p>}
      <Select ref={ref} id={uniqueId} {...rest} />
      {props.isInvalid && invalidMsg && (
        <span id={`${uniqueId}-error-msg`}>{invalidMsg}</span>
      )}
    </div>
  );
});
