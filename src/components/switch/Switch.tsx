import { pxStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { useUID } from "react-uid";
import { LG, MD, SM } from "types/sizes";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SM | MD | LG;

  id?: string;
  name?: string;

  isInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;

  checked?: boolean;
  defaultChecked?: boolean;
}

const SwitchSizes = {
  sm: styled({
    width: pxStep(7, StepSize.PX4),
    height: pxStep(4, StepSize.PX4),
    minWidth: pxStep(7, StepSize.PX4),
    minHeight: pxStep(4, StepSize.PX4),

    "& > label > span": {
      width: `calc(${pxStep(4, StepSize.PX4)} - 4px)`,
      height: `calc(${pxStep(4, StepSize.PX4)} - 4px)`,
    },
  }),
  md: styled({
    width: pxStep(9, StepSize.PX4),
    height: pxStep(5, StepSize.PX4),
    minWidth: pxStep(9, StepSize.PX4),
    minHeight: pxStep(5, StepSize.PX4),

    "& > label > span": {
      width: `calc(${pxStep(5, StepSize.PX4)} - 4px)`,
      height: `calc(${pxStep(5, StepSize.PX4)} - 4px)`,
    },
  }),
  lg: styled({
    width: pxStep(11, StepSize.PX4),
    height: pxStep(6, StepSize.PX4),
    minWidth: pxStep(11, StepSize.PX4),
    minHeight: pxStep(6, StepSize.PX4),

    "& > label > span": {
      width: `calc(${pxStep(6, StepSize.PX4)} - 4px)`,
      height: `calc(${pxStep(6, StepSize.PX4)} - 4px)`,
    },
  }),
};

const SwitchStyle = styled<SwitchProps>(({ theme }) => ({
  position: "relative",

  "& input": {
    position: "absolute",
    inset: 0,
    visibility: "hidden",
  },

  "& > label": {
    display: "block",
    background: theme.colors.defaultStroke,
    borderRadius: "999px",
    width: "100%",
    height: "100%",
    padding: "2px",

    cursor: "pointer",
  },

  "&:focus > input:not(:disabled) ~ label, &:focus-within > input:not(:disabled) ~ label": {
    boxShadow: `0px 0px 1px 2px ${theme.colors.primary}20`,
  },

  "& > label, & > label > span": {
    transition: `box-shadow 0.2s, background 0.2s ${theme.easings.inOutCubic}, transform 0.15s`,
  },

  "& > label > span": {
    display: "block",
    background: theme.colors.onPrimary,
    borderRadius: "999px",
  },

  "& > input:checked ~ label": {
    background: theme.colors.primary,

    "& > span": {
      transform: `translateX(calc(100%))`,
      boxShadow: "0px 1px 6px 0px rgba(0,0,0, 0.18)",
    },
  },

  "& > input:disabled ~ label": {
    cursor: "not-allowed",
    opacity: "0.5",

    "& > span": {
      boxShadow: "none",
    },
  },

  "&[aria-invalid='true']": {
    "&:focus > label, &:focus-within > label": {
      boxShadow: `0px 0px 1px 2px ${theme.colors.danger}20`,
    },
  },
}));

export const Switch = React.memo(
  React.forwardRef(function (
    props: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const { size = "md", id = useUID(), isInvalid, ...rest } = props;

    return (
      <div
        className={`${SwitchStyle({ size })} ${SwitchSizes[size]}`}
        aria-disabled={!!props.disabled}
        aria-invalid={!!isInvalid}
        aria-required={!!props.required}
      >
        <input ref={ref} {...rest} id={id} type="checkbox" />

        <label htmlFor={id} tabIndex={0}>
          <span></span>
        </label>
      </div>
    );
  })
);
