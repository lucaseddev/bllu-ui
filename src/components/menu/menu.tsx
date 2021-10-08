import { Intent } from "../../constants";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React, { useEffect } from "react";
import { IconType } from "react-icons";

import { Icon } from "../icon";
import { Box, BoxProps } from "components/box";
import { MD, SM } from "types/sizes";

export interface MenuProps extends BoxProps {
  children: React.ReactNode;

  size?: SM | MD;
}

const MenuStyle = styled<Omit<MenuProps, "children">>(
  ({ theme, size }) => ({
    padding: `${pxStep(1)} 0`,
    margin: 0,
    listStyle: "none",
    fontSize: remStep(7, StepSize.REM125),
    color: theme.colors.onDefault,

    "& svg": {
      fontSize: size === "sm" ? 16 : 18,
    },

    "&:focus-visible": {
      outline: "none",
    },

    "& *[role='menuitem']": {
      padding:
        size === "sm"
          ? `${pxStep(2, StepSize.PX4)} ${pxStep(4, StepSize.PX4)}`
          : `${pxStep(3, StepSize.PX4)} ${pxStep(4, StepSize.PX4)}`,
      userSelect: "none",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",

      cursor: "pointer",

      "&[data-selected='false']:hover": {
        background: theme.colors.hoverDefault,
      },

      "&[data-selected='false']:active": {
        background: theme.colors.activeDefault,
      },

      "&[data-selected='true']": {
        pointerEvents: "none",
      },

      "&:not(:hover)[data-selected='true'], &[data-selected='true']:hover": {
        background: theme.colors.underPrimary,
      },

      "&[data-intention='danger']": {
        color: theme.colors.danger,

        "&:hover": {
          background: theme.colors.underDanger,
        },

        "&:active": {
          background: theme.colors.activeDefault,
        },
      },

      "&[aria-disabled='true']": {
        color: theme.colors.defaultStroke,
        pointerEvents: "none",
      },
    },

    "& > *[role='group']": {
      padding: 0,

      "&:not(:last-child)::after": {
        content: " ",
        display: "block",
        background: theme.colors.surfaceStroke,
        height: 1,
        width: "100%",
        margin: `${pxStep(1, StepSize.PX4)} 0`,
      },

      "& > span:first-child": {
        color: theme.colors.onDefault,
        display: "block",
        boxSizing: "border-box",
        fontSize: remStep(6, StepSize.REM125),
        fontWeight: "bolder",
        padding: `${pxStep(2, StepSize.PX4)} ${pxStep(
          3,
          StepSize.PX4
        )}`,
      },
    },
  })
);

const MenuItemIcon = styled({
  marginRight: pxStep(3, StepSize.PX4),
});

export const Menu = React.memo(function Menu(props: MenuProps) {
  const { children, size = "sm", ...rest } = props;

  return (
    <Box
      tabIndex={0}
      role="menu"
      aria-orientation="vertical"
      className={`${MenuStyle({ size })}`}
      {...rest}
    >
      {children}
    </Box>
  );
});

export interface MenuItemProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLElement>,
      "type" | "prefix"
    >,
    Omit<React.ButtonHTMLAttributes<HTMLElement>, "prefix"> {
  children: React.ReactNode;

  selected?: boolean;
  disabled?: boolean;

  as?: "button" | "a";

  icon?: IconType | JSX.Element;
  sufix?: React.ReactNode;

  intent?: Intent;
}

export interface MenuGroupProps {
  label?: string;
  children: React.ReactNode;
}

export const MenuItem = React.memo(function Item(
  props: MenuItemProps
) {
  const {
    children,
    selected,
    disabled,
    onClick,
    as = "div",
    icon: PrefixIcon,
    sufix: SufixContent,
    intent: intention = Intent.NONE,
    ...rest
  } = props;

  return React.createElement(
    as,
    {
      tabIndex: 0,
      "aria-disabled": !!disabled,
      disabled: disabled,
      role: "menuitem",
      "data-selected": !!selected,
      "data-intention": intention,
      onClick: onClick,
      ...rest,
    },
    <React.Fragment>
      {PrefixIcon && (
        <Icon className={MenuItemIcon} icon={PrefixIcon} />
      )}
      <span>{children}</span>
      {SufixContent}
    </React.Fragment>
  );
});

export const MenuGroup = React.memo(function Group(
  props: MenuGroupProps
) {
  const { children, label } = props;
  return (
    <div role="group">
      {label && <span>{label}</span>}
      {children}
    </div>
  );
});
