import { Spinner } from "components/spinner";
import { css } from "glamor";
import { pxStep, remStep, StepSize } from "helpers/scale";
import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import { SMALL, MEDIUM, LARGE } from "types/sizes";
import React from "react";
import { IconType } from "react-icons";
import Icon from "components/icon/Icon";

export const PRIMARY = "primary";
export const SECONDARY = "secondary";
export const LINK = "link";

export type PRIMARY = typeof PRIMARY;
export type SECONDARY = typeof SECONDARY;
export type LINK = typeof LINK;

export type ButtonAppearance = PRIMARY | SECONDARY | LINK;
export type ButtonSize = SMALL | MEDIUM | LARGE;

export interface ButtonProps {
  children: any;

  submit?: boolean;
  danger?: boolean;

  beforeIcon?: IconType | JSX.Element;
  afterIcon?: IconType | JSX.Element;

  // Appearance
  appearance?: ButtonAppearance;

  // States
  disabled?: boolean;
  isLoading?: boolean;

  // Sizes
  size?: ButtonSize;

  onClick?: () => void;

  className?: string | StyleObject | StyleFunction;
}

const buttonBaseStyle: StyleFunction = ({ theme }) => ({
  paddingLeft: pxStep(2),
  paddingRight: pxStep(2),
  borderRadius: pxStep(1, StepSize.PX4),
  transition: `background 0.2s, color 0.2s, border 0.2s, fill 0.2s ${theme.easings.inOutCubic}`,
  fontWeight: 500,
  fontSize: remStep(7, StepSize.REM125),
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
      color: theme.colors.defaultStroke,
      borderColor: theme.colors.defaultStroke,
    },
  },
  display: "flex",
  alignItems: "center",
});

const buttonSize: { [size: string]: StyleFunction } = {
  sm: () => ({
    height: pxStep(4),
    minWidth: pxStep(4),
  }),
  md: () => ({
    height: pxStep(5),
    minWidth: pxStep(5),
  }),
  lg: () => ({
    height: pxStep(6),
    minWidth: pxStep(6),
    fontSize: remStep(8, StepSize.REM125),
  }),
};

const buttonAppearance: {
  [appearance: string]: StyleFunction<ButtonProps>;
} = {
  primary: ({ theme, danger }) => {
    const primaryColor = danger
      ? theme.colors.danger
      : theme.colors.primary;

    const hoverPrimary = danger
      ? theme.colors.hoverDanger
      : theme.colors.hoverPrimary;

    const activePrimary = danger
      ? theme.colors.activeDanger
      : theme.colors.activePrimary;

    return {
      background: primaryColor,
      color: theme.colors.onPrimary,
      border: `1px solid ${primaryColor}`,
      ":hover": {
        background: hoverPrimary,
        borderColor: hoverPrimary,
      },
      ":active": {
        background: activePrimary,
        borderColor: activePrimary,
      },
    };
  },
  secondary: ({ theme, danger }) => {
    const secondaryColor = danger
      ? theme.colors.danger
      : theme.colors.onDefault;

    const stroke = danger
      ? theme.colors.danger
      : theme.colors.defaultStroke;

    const hoverSecondary = theme.colors.hoverDefault;

    const activeSecondary = theme.colors.activeDefault;

    return {
      background: theme.colors.default,
      color: secondaryColor,
      border: `1px solid ${stroke}`,
      ":hover": {
        background: hoverSecondary,
      },
      ":active": {
        background: activeSecondary,
      },
    };
  },
  link: ({ theme }) => ({
    color: theme.colors.primary,
    background: "transparent",
    border: "none",
    ":hover": {
      color: theme.colors.secondary,
    },
  }),
};

export const Button = React.memo(
  React.forwardRef(function Button(
    props: ButtonProps,
    ref?: React.LegacyRef<HTMLButtonElement>
  ) {
    const {
      children,
      submit,
      size = "md",
      isLoading,
      disabled,
      appearance = "primary",
      danger,
      beforeIcon: leftIcon,
      afterIcon: rightIcon,
      className = "",
      ...rest
    } = props;
    const themedStyle = useStyles(
      [
        buttonBaseStyle,
        buttonAppearance[appearance || "primary"],
        buttonSize[size || "md"],
        className,
      ],
      { appearance, size, danger }
    );

    let iconSize = 16;

    if (size === "md") {
      iconSize = 18;
    } else if (size === "lg") {
      iconSize = 20;
    }

    return (
      <button
        {...rest}
        ref={ref}
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
        {leftIcon && (
          <Icon
            icon={leftIcon}
            size={iconSize}
            className={{ marginRight: pxStep(1, StepSize.PX4) }}
          />
        )}
        <span>{children}</span>
        {rightIcon && (
          <Icon
            icon={rightIcon}
            size={iconSize}
            className={{ marginLeft: pxStep(1, StepSize.PX4) }}
          />
        )}
      </button>
    );
  })
);
