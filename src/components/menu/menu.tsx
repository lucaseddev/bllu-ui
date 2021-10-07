import { pxStep, remStep, StepSize } from "helpers/scale";
import { styled } from "hooks";
import React from "react";

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
    display: "block",

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

export interface MenuItemProps {
  children: React.ReactNode;

  selected?: boolean;
  disabled?: boolean;

  onClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export interface MenuGroupProps {
  label?: string;
  children: React.ReactNode;
}

export namespace Menu {
  const ItemStyle = styled({});

  export function Item(props: MenuItemProps) {
    const { children, selected, disabled, onClick } = props;
    return (
      <div
        aria-disabled={!!disabled}
        role="menuitem"
        className={`${""}`}
        data-selected={!!selected}
        onClick={onClick}
      >
        {children}
      </div>
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
