import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelect, UseSelectStateChange } from "downshift";
import { StyleFunction, useStyles } from "hooks/useStyles";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleFill,
} from "react-icons/ri";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { LARGE, MEDIUM, SMALL } from "types/sizes";
import cx from "classnames";
import { Portal } from "components/portal";
import { Spinner } from "components/spinner";

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
  name?: string;
  id?: string;

  suppressClear?: boolean;

  disabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
}

const sizes = {
  sm: { height: pxStep(4), fontSize: remStep(6, StepSize.REM125) },
  md: { height: pxStep(5), fontSize: remStep(6, StepSize.REM125) },
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

  "&:disabled": {
    cursor: "not-allowed",
    background: theme.colors.surface,
  },

  "&:hover:not(:disabled), &[aria-expanded='true']": {
    "& > span:last-child:not([data-ishover])": {
      color: theme.colors.onDefault,
    },
  },

  "& > span:first-child": {
    flexGrow: 1,

    "&[data-isselected='false']": {
      opacity: 0.5,
    },
  },

  "& > span:last-child": {
    color: theme.colors.defaultStroke,
    transition: `color 0.1s ${theme.easings.inOutCubic}`,
    width: pxStep(9, StepSize.PX2),

    borderRadius: "50%",

    marginLeft: pxStep(3, StepSize.PX4),
    display: "flex",
    fontSize: 16,

    alignItems: "center",
    justifyContent: "center",
  },

  "& > div:last-child": {
    fill: theme.colors.defaultStroke,
    marginLeft: pxStep(3, StepSize.PX4),
  },

  "&[aria-expanded='true']:not([data-isinvalid='true'])": {
    boxShadow: `0px 0px 1px 2px ${theme.colors.primary}20`,
    borderColor: `${theme.colors.primary}a3`,
  },

  "&[data-isinvalid='true']": {
    borderColor: `${theme.colors.danger}a3`,

    "&[aria-expanded='true']": {
      boxShadow: `0px 0px 1px 2px ${theme.colors.danger}20`,
    },
  },

  "& > span:last-child[data-ishover]": {
    "&:hover": {
      color: theme.colors.onDefault,
    },
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
  fontSize: remStep(6, StepSize.REM125),

  position: "absolute",
  display: "block",

  marginTop: pxStep(3, StepSize.PX2),

  boxShadow: "0px 5px 11px 0px rgba(0,0,0, 0.06)",

  "& li": {
    padding: `${pxStep(3, StepSize.PX4)} ${pxStep(4, StepSize.PX4)}`,
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

export const Select = React.memo(
  React.forwardRef(function Select(
    props: SelectProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) {
    const {
      size = "md",
      options = [],
      width,
      placeholder,
      value,
      suppressClear,
      disabled,
      isLoading,
      isInvalid,
      name,
      id,
      onChange,
      onBlur,
    } = props;

    const [dropdownWidth, setDropdownWidth] = useState<number>();
    const [isHover, setIsHover] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleSelectedItemChange = useCallback(
      (value: UseSelectStateChange<SelectOptionProps>) => {
        onChange && onChange(value.selectedItem || null);
      },
      [onChange]
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
    }, [width, wrapperRef.current, selectedItem]);

    return (
      <div className={wrapperStyle} ref={wrapperRef}>
        <button
          className={selectStyle}
          role="button"
          {...getToggleButtonProps({
            ref: ref,
            name: name,
            value: value,
            id: id,
            disabled: isLoading || disabled,
            onBlur: () =>
              !isOpen &&
              handleSelectedItemBlur({
                selectedItem,
                highlightedIndex,
                inputValue,
                isOpen,
                type: useSelect.stateChangeTypes.MenuBlur,
              }),

            onMouseEnter: () =>
              selectedItem && !suppressClear && setIsHover(true),
            onMouseLeave: () => !suppressClear && setIsHover(false),
          })}
          data-isinvalid={isInvalid}
        >
          <span data-isselected={(selectedItem && true) || false}>
            {selectedItem?.label ||
              placeholder ||
              "Selecione um item..."}
          </span>
          {isHover ? (
            <span
              data-ishover
              onClick={(event) => {
                // @ts-ignore
                selectItem(undefined);
                handleSelectedItemChange({
                  selectedItem: undefined,
                  type: useSelect.stateChangeTypes.FunctionSelectItem,
                });
                setIsHover(false);
                event.stopPropagation();
              }}
            >
              <RiCloseCircleFill />
            </span>
          ) : (
            (isLoading && <Spinner />) || (
              <span>
                {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
            )
          )}
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
  })
);
