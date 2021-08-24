import React from "react";
import { useSelect } from "downshift";
import { StyleFunction, useStyles } from "hooks/useStyles";
import { BiChevronDown } from "react-icons/bi";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

export interface SelectProps {
  width?: string | number;

  size?: SMALL | MEDIUM | LARGE;
}

const sizes = {
  sm: { height: pxStep(4) },
  md: { height: pxStep(5) },
  lg: { height: pxStep(6), fontSize: remStep(7, StepSize.REM125) },
};

const selectStyle: StyleFunction<SelectProps> = ({
  theme,
  width,
  size,
}) => ({
  ...sizes[size || MEDIUM],
  display: "flex",
  alignItems: "center",
  width: width || "fit-content",

  paddingLeft: pxStep(3, StepSize.PX4),
  paddingRight: pxStep(3, StepSize.PX4),

  border: `1px solid ${theme.colors.defaultStroke}`,
  borderRadius: pxStep(1, StepSize.PX4),

  cursor: "pointer",

  transition: `border 0.2s, box-shadow 0.2s, background 0.2s, fill 0.2s ${theme.easings.inOutCubic}`,

  ":hover": {
    background: theme.colors.hoverDefault,
  },

  "& > span:first-child": {
    flexGrow: 1,
    fontSize: remStep(7, StepSize.REM125),
  },

  "& > span:last-child": {
    marginLeft: pxStep(1),

    display: "flex",
  },
});

export function Select(props: SelectProps) {
  const { size = "md" } = props;

  const style = useStyles([selectStyle], { size });
  // const {
  //   isOpen,
  //   selectedItem,
  //   getToggleButtonProps,
  //   getLabelProps,
  //   getMenuProps,
  //   highlightedIndex,
  //   getItemProps,
  //   inputValue,
  //   closeMenu,
  //   openMenu,
  //   reset,
  //   selectItem,
  //   setHighlightedIndex,
  //   toggleMenu
  // } = useSelect({ items: [] });

  return (
    <div className={style}>
      <span>Select a value...</span>
      <span>
        <BiChevronDown />
      </span>
    </div>
  );
}
