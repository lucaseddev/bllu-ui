import cxs, { CSSObject } from "cxs";
import { cssStep, StepSize } from "helpers/cssScale";
import { useTheme } from "hooks/useTheme";
import React from "react";
import { LARGE, MEDIUM, SMALL } from "types/sizes";
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
  size: SMALL | MEDIUM | LARGE;
}

const buttonAppearance = {
  primary: (theme: Theme): CSSObject => ({
    background: theme.colors.primary,
    color: theme.colors.onPrimary,
    padding: `${cssStep(1)} ${cssStep(2)}`,
    borderRadius: cssStep(1, StepSize.MINOR_REM),
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
      className={cxs(
        buttonAppearance[appearance || "primary"](theme)
      )}
      type={(submit && "submit") || "button"}
    >
      {text}
    </button>
  );
}
