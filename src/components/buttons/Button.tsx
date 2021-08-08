import cxs, { CSSObject } from "cxs";
import { cssStep, StepSize } from "helpers/cssScale";
import { useTheme } from "hooks/useTheme";
import React from "react";
import {
  EXTRA_SMALL,
  SMALL,
  MEDIUM,
  LARGE,
  EXTRA_LARGE,
} from "types/sizes";
import { Theme } from "types/theme";

export const PRIMARY = "primary";
export const SECONDARY = "secondary";
export const LINK = "link";

export type PRIMARY = typeof PRIMARY;
export type SECONDARY = typeof SECONDARY;
export type LINK = typeof LINK;

export type ButtonAppearance = PRIMARY | SECONDARY | LINK;

export interface ButtonProps {
  text: string;

  submit: boolean;

  // Appearance
  appearance: ButtonAppearance;

  // States
  disabled: boolean;
  isLoading: boolean;

  // Sizes
  size: EXTRA_SMALL | SMALL | MEDIUM | LARGE | EXTRA_LARGE;
}

const buttonBaseStyle: CSSObject = {
  paddingLeft: cssStep(2),
  paddingRight: cssStep(2),
  borderRadius: cssStep(1, StepSize.MINOR_REM),
};

const buttonSize: { [size: string]: CSSObject } = {
  xs: {
    height: cssStep(3),
  },
  sm: {
    height: cssStep(4),
  },
  md: {
    height: cssStep(5),
    fontSize: cssStep(7, StepSize.XMINOR_REM),
  },
  lg: {
    height: cssStep(6),
    fontSize: cssStep(8, StepSize.XMINOR_REM),
  },
  xl: {
    height: cssStep(7),
    fontSize: cssStep(9, StepSize.XMINOR_REM),
  },
};

const buttonAppearance = {
  primary: (theme: Theme): CSSObject => ({
    background: theme.colors.primary,
    color: theme.colors.onPrimary,
    ":hover": {
      background: theme.colors.secondary,
      cursor: "pointer",
    },
  }),
  secondary: (theme: Theme): CSSObject => ({}),
  link: (theme: Theme): CSSObject => ({}),
};

export function Button(props: ButtonProps) {
  const {
    text,
    submit,
    size,
    isLoading,
    disabled,
    appearance,
    ...rest
  } = props;

  const { theme } = useTheme();

  return (
    <button
      className={cxs({
        ...buttonBaseStyle,
        ...buttonSize[size || "md"],
        ...buttonAppearance[appearance || "primary"](theme),
      })}
      type={(submit && "submit") || "button"}
    >
      {text}
    </button>
  );
}
