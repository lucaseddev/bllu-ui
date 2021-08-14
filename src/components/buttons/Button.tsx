import { Spinner } from "components/spinner";
import { css } from "glamor";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { StyleFunction, useStyles } from "hooks/useStyles";
import { useTheme } from "hooks/useTheme";
import React, { useEffect, useMemo, useState } from "react";
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

  submit?: boolean;

  // Appearance
  appearance?: ButtonAppearance;

  // States
  disabled?: boolean;
  isLoading?: boolean;

  // Sizes
  size?: SMALL | MEDIUM | LARGE;

  ref?: React.LegacyRef<HTMLButtonElement>;

  onClick?: () => void;
}

const buttonBaseStyle: StyleFunction = ({ theme }) => ({
  paddingLeft: pxStep(2),
  paddingRight: pxStep(2),
  borderRadius: pxStep(1, StepSize.PX4),
  transition: `background 0.2s, color 0.2s, border 0.2s, fill 0.2s ${theme.easings.inOutCubic}`,
  ":hover": {
    cursor: "pointer",
  },
  ":disabled": {
    background: "transparent",
    color: theme.colors.defaultStroke,
    border: `1px solid ${theme.colors.defaultStroke}`,
    cursor: "not-allowed",
    fill: theme.colors.defaultStroke,
    ":hover": {
      background: "transparent",
    },
  },

  display: "flex",
  alignItems: "center",
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
  primary: ({ theme }) => ({
    background: theme.colors.primary,
    color: theme.colors.onPrimary,
    ":hover": {
      background: theme.colors.secondary,
    },
    border: `1px solid ${theme.colors.primary}`,
  }),
  secondary: ({ theme }) => ({
    background: theme.colors.default,
    color: theme.colors.onDefault,
    border: `1px solid ${theme.colors.defaultStroke}`,
    ":hover": {
      background: theme.colors.surface,
    },
  }),
  link: ({ theme }) => ({
    color: theme.colors.primary,
    background: "transparent",
    border: "none",
    ":hover": {
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
    ...rest
  } = props;
  const themedStyle = useStyles(
    [
      buttonBaseStyle,
      buttonAppearance[appearance || "primary"],
      buttonSize[size || "md"],
    ],
    { appearance, size }
  );

  return (
    <button
      {...rest}
      className={themedStyle}
      type={(submit && "submit") || "button"}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <Spinner
          className={css({ marginRight: pxStep(2, StepSize.PX4) })}
          size={"md"}
        />
      )}
      {text}
    </button>
  );
}
