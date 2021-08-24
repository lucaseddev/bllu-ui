import React from "react";
import { useSelect } from "downshift";
import { StyleFunction, useStyles } from "hooks/useStyles";
import { BiChevronDown } from "react-icons/bi";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

export interface SelectProps {
  width?: string | number;

  size?: SMALL | MEDIUM | LARGE;

  options: never[];
}

const sizes = {
  sm: { height: pxStep(4) },
  md: { height: pxStep(5) },
  lg: { height: pxStep(6), fontSize: remStep(7, StepSize.REM125) },
};

type StyleSelectProps = Omit<SelectProps, "options">;

const WrapperStyle: StyleFunction<StyleSelectProps> = ({
  theme,
  width,
}) => ({
  position: "relative",
  width: width || "fit-content",
});

const SelectStyle: StyleFunction<StyleSelectProps> = ({
  theme,
  width,
  size,
}) => ({
  ...sizes[size || MEDIUM],
  display: "flex",
  alignItems: "center",

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

const ListStyle: StyleFunction<StyleSelectProps> = ({ theme }) => ({
  maxHeight: "180px",
  overflowY: "auto",
  margin: 0,
  borderTop: 0,
  background: "white",
  position: "absolute",
  zIndex: 1000,
  listStyle: "none",
  padding: `${pxStep(1, StepSize.PX4)} 0`,
  minWidth: "100%",

  marginTop: pxStep(3, StepSize.PX2),

  boxShadow: `
  0 3.4px 2.7px rgba(0, 0, 0, 0.012),
  0 8.7px 6.9px rgba(0, 0, 0, 0.018),
  0 17.7px 14.2px rgba(0, 0, 0, 0.022),
  0 36.5px 29.2px rgba(0, 0, 0, 0.028),
  0 100px 80px rgba(0, 0, 0, 0.04)
  `,

  "& li": {
    padding: `${pxStep(3, StepSize.PX4)} ${pxStep(6, StepSize.PX4)}`,
    fontSize: remStep(7, StepSize.REM125),
  },
});

export function Select(props: SelectProps) {
  const { size = "md", options = [], width } = props;

  const wrapperStyle = useStyles([WrapperStyle], { width });
  const selectStyle = useStyles([SelectStyle], { size });
  const listStyle = useStyles([ListStyle]);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    closeMenu,
    openMenu,
    reset,
    selectItem,
    setHighlightedIndex,
    toggleMenu,
  } = useSelect({ items: [] });

  return (
    <div className={wrapperStyle}>
      <div
        className={selectStyle}
        role="button"
        {...getToggleButtonProps()}
      >
        <span>Select a value...</span>
        <span>
          <BiChevronDown />
        </span>
      </div>
      <ul {...getMenuProps()} className={listStyle}>
        {isOpen &&
          ["Select a value...", ...options].map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
