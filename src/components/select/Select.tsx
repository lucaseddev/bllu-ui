import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelect, UseSelectStateChange } from "downshift";
import { StyleFunction, useStyles } from "hooks/useStyles";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { LARGE, MEDIUM, SMALL } from "types/sizes";
import cx from "classnames";
import { Portal } from "components/portal";

export interface SelectOptionProps {
  value: string | number;
  label: string | React.ReactNode;
}

export interface SelectProps {
  width?: string | number;

  size?: SMALL | MEDIUM | LARGE;

  options: SelectOptionProps[];

  placeholder?: string;

  onChange?: (value: SelectOptionProps | null) => void;
  onBlur?: (value: SelectOptionProps | null) => void;
  value?: string | number;
}

const sizes = {
  sm: { height: pxStep(4) },
  md: { height: pxStep(5) },
  lg: { height: pxStep(6), fontSize: remStep(7, StepSize.REM125) },
};

type StyleSelectProps = Omit<SelectProps, "options">;

const WrapperStyle: StyleFunction<StyleSelectProps> = ({
  width,
}) => ({
  position: "relative",
  width: width || "fit-content",
});

const SelectStyle: StyleFunction<StyleSelectProps> = ({
  theme,
  size,
}) => ({
  ...sizes[size || MEDIUM],
  display: "flex",
  alignItems: "center",
  width: "auto",
  background: theme.colors.default,

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

const ListStyle: StyleFunction<StyleSelectProps> = ({
  theme,
  width,
}) => ({
  maxHeight: "180px",
  minWidth: width || "auto",
  width: width || "auto",
  overflowY: "auto",
  overflowX: "hidden",
  margin: 0,
  borderTop: 0,
  background: "white",
  zIndex: 1000,
  listStyle: "none",
  padding: `${pxStep(1, StepSize.PX4)} 0`,
  border: `1px solid ${theme.colors.defaultStroke}`,
  borderRadius: pxStep(1, StepSize.PX4),

  position: "absolute",
  display: "block",

  marginTop: pxStep(3, StepSize.PX2),

  boxShadow: "0px 5px 11px 0px rgba(0,0,0, 0.06)",

  "& li": {
    padding: `${pxStep(3, StepSize.PX4)} ${pxStep(4, StepSize.PX4)}`,
    fontSize: remStep(7, StepSize.REM125),
    userSelect: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",

    "&[data-hover='true'][data-selected='false']": {
      background: theme.colors.hoverDefault,
    },

    "&[data-hover='false'][data-selected='true'], &[data-hover='true'][data-selected='true']": {
      background: theme.colors.underPrimary,
    },
  },

  "&:focus-visible": {
    outline: "none",
  },
});

const ListStateStyle: StyleFunction<{ isOpen: boolean }> = ({
  isOpen,
}) => ({
  transform: isOpen ? "translateX(0px)" : "translateX(-1000%)",
});

export function Select(props: SelectProps) {
  const {
    size = "md",
    options = [],
    width,
    placeholder,
    value,
    onChange,
    onBlur,
  } = props;

  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleSelectedItemChange = useCallback(
    (value: UseSelectStateChange<SelectOptionProps>) => {
      onChange && onChange(value.selectedItem || null);
    },
    [onChange, toggleRef.current]
  );

  const handleSelectedItemBlur = useCallback(
    (value: UseSelectStateChange<SelectOptionProps>) => {
      onBlur && onBlur(value.selectedItem || null);
    },
    [onBlur]
  );

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    inputValue,
  } = useSelect({
    items: options,
    itemToString: (item) => (item ? String(item.label) : ""),
    onSelectedItemChange: handleSelectedItemChange,
    selectedItem: options.find((v) => v.value === value),
  });

  const wrapperStyle = useStyles([WrapperStyle], {
    width: width,
  });
  const selectStyle = useStyles([SelectStyle], { size });
  const listStyle = useStyles([ListStyle], {
    width: dropdownWidth,
  });
  const listStateStyle = useStyles([ListStateStyle], {
    isOpen,
  });

  useEffect(() => {
    if (
      wrapperRef.current &&
      wrapperRef.current.offsetWidth !== dropdownWidth
    ) {
      setDropdownWidth(wrapperRef.current.offsetWidth);
    }
  }, [width, wrapperRef.current, isOpen]);

  return (
    <div className={wrapperStyle} ref={wrapperRef}>
      <button
        className={selectStyle}
        role="button"
        {...getToggleButtonProps({
          // ref: toggleRef
          onBlur: () =>
            !isOpen &&
            handleSelectedItemBlur({
              selectedItem,
              highlightedIndex,
              inputValue,
              isOpen,
              type: useSelect.stateChangeTypes.MenuBlur,
            }),
        })}
      >
        <span>
          {selectedItem?.label ||
            placeholder ||
            "Selecione um item..."}
        </span>
        <span>{isOpen ? <BiChevronUp /> : <BiChevronDown />}</span>
      </button>
      <Portal>
        <ul
          {...getMenuProps({ ref: listRef })}
          className={cx(listStyle, listStateStyle)}
        >
          {options.map((item, index) => (
            <li
              key={`${item.value}${index}`}
              {...getItemProps({
                item,
                index,
                onClick: () => selectItem(item),
              })}
              data-hover={highlightedIndex === index}
              data-selected={selectedItem?.value === item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </Portal>
    </div>
  );
}
