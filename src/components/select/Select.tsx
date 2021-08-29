import React from "react";
import { useSelect } from "downshift";
import { StyleFunction, useStyles } from "hooks/useStyles";
import { BiChevronDown } from "react-icons/bi";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

export interface SelectOptionProps {
  value: string | number;
  label: string | React.ReactNode;
}
export interface SelectProps {
  width?: string | number;

  size?: SMALL | MEDIUM | LARGE;

  options: SelectOptionProps[];

  placeholder?: string;
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

  "&[aria-expanded='true']": {
    boxShadow: `0px 0px 1px 2px ${theme.colors.primary}20`,
    borderColor: `${theme.colors.primary}a3`,
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

  boxShadow: "0px 5px 11px 0px rgba(0,0,0, 0.06)",

  "& li": {
    padding: `${pxStep(3, StepSize.PX4)} ${pxStep(6, StepSize.PX4)}`,
    fontSize: remStep(7, StepSize.REM125),
  },

  "&:focus-visible": {
    outline: "none",
    border: `1px solid ${theme.colors.defaultStroke}`,
    borderRadius: pxStep(1, StepSize.PX4),
  },
});

export function Select(props: SelectProps) {
  const { size = "md", options = [], width, placeholder } = props;

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
  } = useSelect({
    items: options,
    itemToString: (item) => (item ? String(item.label) : ""),
  });

  return (
    <div className={wrapperStyle}>
      <div
        className={selectStyle}
        role="button"
        {...getToggleButtonProps()}
      >
        <span>
          {selectedItem?.label ||
            placeholder ||
            "Selecione um item..."}
        </span>
        <span>
          <BiChevronDown />
        </span>
      </div>
      {isOpen && (
        <ul {...getMenuProps()} className={listStyle}>
          {options.map((item, index) => (
            <li
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
