import cxs, { CSSObject } from "cxs";
import { combine, StyleFunction } from "helpers/combine";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { useTheme } from "hooks/useTheme";
import React, { useMemo } from "react";
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
  size: SMALL | MEDIUM | LARGE;
}

const buttonBaseStyle: StyleFunction = ({ theme }) => ({
  paddingLeft: pxStep(2),
  paddingRight: pxStep(2),
  borderRadius: pxStep(1, StepSize.PX4),
  transition: `background 0.2s, color 0.2s, border 0.2s ${theme.easings.inOutCubic}`,
  ":hover": {
    cursor: "pointer",
  },
});

const buttonSize: { [size: string]: StyleFunction } = {
  sm: () => ({
    height: pxStep(4),
  }),
  md: () => ({
    height: pxStep(5),
  }),
  lg: () => ({
    height: pxStep(6),
    fontSize: remStep(7, StepSize.REM125),
  }),
};

const buttonAppearance: { [appearance: string]: StyleFunction } = {
  primary: ({ theme, prev }) => ({
    background: theme.colors.primary,
    color: theme.colors.onPrimary,
    ":hover": {
      ...prev[":hover"],
      background: theme.colors.secondary,
    },
    border: `1px solid ${theme.colors.primary}`,
  }),
  secondary: ({ theme, prev }) => ({
    background: theme.colors.default,
    color: theme.colors.onDefault,
    border: `1px solid ${theme.colors.defaultStroke}`,
    ":hover": {
      ...prev[":hover"],
      background: theme.colors.surface,
    },
  }),
  link: ({ theme, prev }) => ({
    color: theme.colors.primary,
    background: "transparent",
    border: "none",
    ":hover": {
      ...prev[":hover"],
      color: theme.colors.secondary,
    },
  }),
};

export function Button(props: ButtonProps) {
  const {
    text,
    submit,
    size,
    isLoading,
    disabled,
    appearance,
  } = props;
  const { theme } = useTheme();

  const styles = useMemo(() => {
    return cxs(
      combine(theme, [
        buttonBaseStyle,
        buttonSize[size || "md"],
        buttonAppearance[appearance || "primary"],
      ])
    );
  }, [size, appearance, isLoading]);

  return (
    <button
      className={styles}
      type={(submit && "submit") || "button"}
    >
      {text}
    </button>
  );
}
