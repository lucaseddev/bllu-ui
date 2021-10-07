import { Intention } from "../../constants";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";
import { IconType } from "react-icons";

import { Icon } from "../icon";

export interface MenuProps {
  children: React.ReactNode;
}

const MenuStyle = styled(({ theme }) => ({
  padding: 0,
  margin: 0,
  listStyle: "none",
  fontSize: remStep(7, StepSize.REM125),

  "&:focus-visible": {
    outline: "none",
  },

  "& *[role='menuitem']": {
    padding: `${pxStep(3, StepSize.PX4)} ${pxStep(4, StepSize.PX4)}`,
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

      "&:active": {
        background: theme.colors.underDanger,
      },
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
      display: "block",
      boxSizing: "border-box",
      fontSize: remStep(6, StepSize.REM125),
      fontWeight: "bold",
      padding: `${pxStep(2, StepSize.PX4)} ${pxStep(
        3,
        StepSize.PX4
      )}`,
    },
  },
}));

const MenuItemIcon = styled({
  marginRight: pxStep(3, StepSize.PX4),
});

export function Menu(props: MenuProps) {
  const { children } = props;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={`${MenuStyle()}`}
    >
      {children}
    </div>
  );
}

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

  intention?: Intention;
}

export interface MenuGroupProps {
  label?: string;
  children: React.ReactNode;
}

export namespace Menu {
  const ItemStyle = styled({});

  export function Item(props: MenuItemProps) {
    const {
      children,
      selected,
      disabled,
      onClick,
      as = "div",
      icon: PrefixIcon,
      sufix: SufixContent,
      intention = Intention.NONE,
      ...rest
    } = props;

    return React.createElement(
      as,
      {
        "aria-disabled": !!disabled,
        role: "menuitem",
        className: `${""}`,
        "data-selected": !!selected,
        "data-intention": intention,
        onClick: onClick,
        ...rest,
      },
      <React.Fragment>
        {PrefixIcon && (
          <Icon
            className={MenuItemIcon}
            size={18}
            icon={PrefixIcon}
          />
        )}
        <span>{children}</span>
        {SufixContent}
      </React.Fragment>
    );
  }

  const GroupStyle = styled({});

  export function Group(props: MenuGroupProps) {
    const { children, label } = props;
    return (
      <div role="group" className={`${""}`}>
        {label && <span>{label}</span>}
        {children}
      </div>
    );
  }
}
