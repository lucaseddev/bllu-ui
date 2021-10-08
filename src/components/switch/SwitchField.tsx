import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { useUIDSeed } from "react-uid";
import { Switch, SwitchProps } from ".";

export interface SwitchFieldProps extends SwitchProps {
  position?: "left" | "right";
  label?: string;
  description?: string;
}

const SwitchFieldStyle = styled(({ theme }) => ({
  position: "relative",

  display: "inline-flex",
  alignItems: "center",

  "& > label": {
    "& > span": {
      marginBottom: pxStep(1, StepSize.PX4),
      fontSize: remStep(7, StepSize.REM125),
      fontWeight: 600,
    },

    "& > p": {
      margin: 0,

      fontSize: remStep(6, StepSize.REM125),
      color: theme.colors.onSurface,
    },
  },

  "&[data-position='left']": {
    flexDirection: "row-reverse",

    "& > label": {
      marginLeft: pxStep(3, StepSize.PX4),
    },
  },

  "&[data-position='right']": {
    "& > label": {
      marginRight: pxStep(3, StepSize.PX4),
    },
  },
}));

export const SwitchField = React.memo(
  React.forwardRef(function (
    props: SwitchFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const {
      label,
      description,
      name,
      id,
      position = "left",
      ...rest
    } = props;

    if (!props.name) {
      console.warn(
        '"name" prop is required for SwitchField component!'
      );
      throw new Error(
        '"name" prop is required for SwitchField component!'
      );
    }

    if (!props.label) {
      console.warn(
        '"label" prop is required for SwitchField component!'
      );
      throw new Error(
        '"label" prop is required for SwitchField component!'
      );
    }

    const uniqueId = id || useUIDSeed()(props.name);

    return (
      <div
        className={`${SwitchFieldStyle()}`}
        data-position={position}
      >
        <label htmlFor={uniqueId}>
          <span>{label}</span>
          <p>{description}</p>
        </label>
        <Switch name={name} id={uniqueId} {...rest} ref={ref} />
      </div>
    );
  })
);
