import cx from "classnames";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { LG, MD, SM } from "types/sizes";

import { BiCheck, BiMinus } from "react-icons/bi";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SM | MD | LG;

  checked?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  isInvalid?: boolean;

  label: string;
}

export const CheckboxSizes = {
  sm: styled({
    width: pxStep(4, StepSize.PX4),
    height: pxStep(4, StepSize.PX4),
    minWidth: pxStep(4, StepSize.PX4),
    minHeight: pxStep(4, StepSize.PX4),

    fontSize: 16,
  }),
  md: styled({
    width: pxStep(5, StepSize.PX4),
    height: pxStep(5, StepSize.PX4),
    minWidth: pxStep(5, StepSize.PX4),
    minHeight: pxStep(5, StepSize.PX4),

    fontSize: 20,
  }),
  lg: styled({
    width: pxStep(6, StepSize.PX4),
    height: pxStep(6, StepSize.PX4),
    minWidth: pxStep(6, StepSize.PX4),
    minHeight: pxStep(6, StepSize.PX4),

    fontSize: 20,
  }),
};

const CheckboxStyle = styled({
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",

  margin: `${pxStep(3, StepSize.PX4)} 0px`,

  "&[aria-disabled='true']": {
    cursor: "not-allowed",
  },

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
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: pxStep(1, StepSize.PX4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    "& > svg": {
      position: "absolute",
      strokeWidth: 1,
    },
  },

  "&[aria-disabled='false']:hover": {
    [`& > input:not(:checked):not(:focus):not(:focus-within) + div`]: {
      borderWidth: `calc(${pxStep(1, StepSize.PX2)} + 1px)`,
    },
  },
});

const CheckboxThemed = styled(({ theme }) => ({
  "&[aria-disabled='true']": {
    "& > div": {
      backgroundColor: theme.colors.defaultStroke,
    },

    "& > input:not(:checked) + div": {
      color: theme.colors.defaultStroke,
    },
  },

  "& > div": {
    borderColor: theme.colors.defaultStroke,
    transition: `box-shadow 0.2s, border-width 0.03s ${theme.easings.inOutCubic}`,
    color: theme.colors.onPrimary,
  },

  [`& > input:not(:disabled):checked + div`]: {
    borderColor: theme.colors.primary,
    background: theme.colors.primary,
  },

  "&:hover": {
    "& > input:checked:not(:disabled) + div": {
      borderColor: theme.colors.hoverPrimary,
    },
  },

  "& > input:focus + div, & > input:focus-within + div": {
    boxShadow: `0px 0px 1px 2px ${theme.colors.primary}52`,
    borderWidth: pxStep(1, StepSize.PX2),
  },
}));

export function Checkbox(props: CheckboxProps) {
  const {
    label,
    checked,
    indeterminate,
    disabled = false,
    size = "sm",
    defaultChecked,
    onChange,
    name,
    ...rest
  } = props;
  return (
    <label
      className={cx(CheckboxStyle, CheckboxThemed())}
      aria-disabled={disabled}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        {...rest}
      />
      <div className={cx(CheckboxSizes[size])}>
        {indeterminate ? <BiMinus /> : <BiCheck />}
      </div>
      <span>{label}</span>
    </label>
  );
}
