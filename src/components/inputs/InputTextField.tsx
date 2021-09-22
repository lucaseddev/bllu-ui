import { pxStep, remStep, StepSize } from "helpers/scale";
import { StyleFunction, useStyles } from "hooks/useStyles";
import React from "react";
import { InputText, InputTextProps } from "./InputText";

export interface InputTextFieldProps extends InputTextProps {
  label: string;
  description?: string;

  invalidMsg?: string;
}

const WrapperStyle: StyleFunction<
  Omit<InputTextFieldProps, "label">
> = ({ width, theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: width || "auto",

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

export const InputTextField = React.forwardRef(function (
  props: InputTextFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    label,
    description,
    invalidMsg,
    className,
    width,
    ...rest
  } = props;

  const wrapperStyle = useStyles([WrapperStyle, className || ""], {
    width,
  });

  return (
    <div className={wrapperStyle}>
      <label htmlFor={rest.name}>{label}</label>
      {description && <p>{description}</p>}
      <InputText
        ref={ref}
        id={props.name}
        {...rest}
        width="100%"
        aria-errormessage={`${props.name}-error-msg`}
      />
      {props.isInvalid && invalidMsg && (
        <span id={`${props.name}-error-msg`}>{invalidMsg}</span>
      )}
    </div>
  );
});
