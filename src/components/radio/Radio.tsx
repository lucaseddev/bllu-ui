import cx from "classnames";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { LG, MD, SM } from "types/sizes";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string | number;
  label: string;
  isInvalid?: boolean;

  size?: SM | MD | LG;
}

const selectors = {};

export const RadioSizes = {
  sm: styled({
    width: pxStep(4, StepSize.PX4),
    height: pxStep(4, StepSize.PX4),
    minWidth: pxStep(4, StepSize.PX4),
    minHeight: pxStep(4, StepSize.PX4),
  }),
  md: styled({
    width: pxStep(5, StepSize.PX4),
    height: pxStep(5, StepSize.PX4),
    minWidth: pxStep(5, StepSize.PX4),
    minHeight: pxStep(5, StepSize.PX4),
  }),
  lg: styled({
    width: pxStep(6, StepSize.PX4),
    height: pxStep(6, StepSize.PX4),
    minWidth: pxStep(6, StepSize.PX4),
    minHeight: pxStep(6, StepSize.PX4),
  }),
};

export const RadioStyle = styled({
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",

  "&[aria-disabled='true']": {
    cursor: "not-allowed",
  },

  margin: `${pxStep(3, StepSize.PX4)} 0px`,

  "& > input": {
    position: "absolute",
    opacity: 0,
    inset: 0,
  },

  "& > span": {
    marginLeft: pxStep(2, StepSize.PX4),
    fontSize: remStep(7, StepSize.REM125),
  },

  "& > div": {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 999,
  },

  [`& > input:checked + .${RadioSizes["sm"]}`]: {
    borderWidth: pxStep(1, StepSize.PX4),
  },

  [`& > input:checked + .${RadioSizes["md"]}`]: {
    borderWidth: `calc(${pxStep(1, StepSize.PX4)} + 1px)`,
  },

  [`& > input:checked + .${RadioSizes["lg"]}`]: {
    borderWidth: `calc(${pxStep(1, StepSize.PX4)} + 2px)`,
  },

  "&[aria-disabled='false']:hover": {
    [`& > input:not(:checked) + div`]: {
      borderWidth: pxStep(1, StepSize.PX2),
    },
  },
});

export const RadioThemed = styled<Partial<RadioProps>>(
  ({ theme, size = "md" }) => ({
    "&[aria-disabled='true']": {
      "& > div": {
        backgroundColor: theme.colors.surface,
      },
    },

    [`& > div`]: {
      borderColor: theme.colors.defaultStroke,
      transition: `box-shadow 0.2s, border-width 0.03s ${theme.easings.inOutCubic}`,
    },

    [`& > input:checked + div`]: {
      borderColor: theme.colors.primary,
    },

    [`&:hover`]: {
      "& > input:checked + div": {
        borderColor: theme.colors.hoverPrimary,
      },
    },

    "& > input:focus + div, & > input:focus-within + div": {
      boxShadow: `0px 0px 1px 2px ${theme.colors.primary}52`,
    },
  })
);

export const Radio = React.memo(
  React.forwardRef(function (
    props: RadioProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const {
      value,
      onChange,
      disabled = false,
      checked,
      isInvalid = false,
      required = false,
      id,
      name,
      label,
      size = "sm",
      ...rest
    } = props;

    return (
      <label
        aria-disabled={disabled}
        className={cx(RadioStyle, RadioThemed({ size }))}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          aria-invalid={isInvalid}
          required={required}
          ref={ref}
          {...rest}
        />
        <div className={cx(RadioSizes[size])}></div>
        <span>{label}</span>
      </label>
    );
  })
);
