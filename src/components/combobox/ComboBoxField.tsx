import cx from "classnames";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks/useStyles";
import React from "react";
import { useUIDSeed } from "react-uid";
import { ComboBox, ComboBoxProps } from ".";

export interface ComboBoxFieldProps extends ComboBoxProps {
  id?: string;
  label: string;
  name: string;
  description?: string;

  invalidMsg?: string;
}

const wrapperStyle = styled<
  Omit<ComboBoxFieldProps, "label" | "name" | "options">
>(({ theme, width }) => ({
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
}));

export function ComboBoxField(props: ComboBoxFieldProps) {
  const {
    id,
    name,
    label,
    description,
    invalidMsg,
    width,
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

  return (
    <div {...wrapperStyle({ width })}>
      <label htmlFor={uniqueId}>{label}</label>
      {description && <p>{description}</p>}
      <ComboBox
        {...rest}
        id={uniqueId}
        width="100%"
        aria-errormessage={`${props.name}-error-msg`}
      />
      {props.isInvalid && invalidMsg && (
        <span id={`${uniqueId}-error-msg`}>{invalidMsg}</span>
      )}
    </div>
  );
}
