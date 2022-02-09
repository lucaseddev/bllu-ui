import React, {
  useCallback,
  useEffect,
  useMemo,
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
import { pxStep, remStep, StepSize, stepToNumber } from "helpers/scale";
import { LG, MD, SM } from "types/sizes";
import cx from "classnames";
import { Portal } from "components/portal";
import { Spinner } from "components/spinner";

export interface SelectOptionItem {
  value: string | number;
  label: string | React.ReactNode;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOptionItem[];
}

export interface SelectProps {
  width?: string | number;

  size?: SM | MD | LG;

  options: (SelectOptionItem | SelectOptionGroup)[];

  placeholder?: string;

  onChange?: (value: SelectOptionItem | null) => void;
  onBlur?: (value: SelectOptionItem | null) => void;
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
  width: width || "auto",
  display: "inline-block",
});

const SelectStyle: StyleFunction<StyleSelectProps> = ({
  theme,
  size,
}) => ({
  ...sizes[size || MD],
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
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

  "& > ul": {
    padding: 0,

    "&:not(:last-child)::after": {
      content: " ",
      display: "block",
      background: theme.colors.surfaceStroke,
      height: 1,
      width: "100%",
      margin: `${pxStep(1, StepSize.PX4)} 0`,
    },

    "& > li:first-child": {
      fontSize: 10,
      fontWeight: "bold",
      padding: `${pxStep(2, StepSize.PX4)} ${pxStep(
        3,
        StepSize.PX4
      )}`,
    },
  },
});

const ListStateStyle: StyleFunction<{ isOpen: boolean, position: { x: number, y: number } }> = ({
  isOpen,
  position: { x, y }
}) => ({
  transform: isOpen ? "translateX(0px)" : "translateX(-1000%)",
  left: x,
  top: y
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
      (value: UseSelectStateChange<SelectOptionItem>) => {
        onChange && onChange(value.selectedItem || null);
      },
      [onChange]
    );

    const handleSelectedItemBlur = useCallback(
      (value: UseSelectStateChange<SelectOptionItem>) => {
        onBlur && onBlur(value.selectedItem || null);
      },
      [onBlur]
    );

    const controlledValue = useMemo(
      function findSelectedItem() {
        let selected: SelectOptionItem | undefined;

        for (let index = 0; index < options.length; index++) {
          const v = options[index];

          if (
            !!(v as SelectOptionItem).value &&
            (v as SelectOptionItem).value === value
          ) {
            selected = v as SelectOptionItem;
            break;
          } else if ((v as SelectOptionGroup).options) {
            selected = (v as SelectOptionGroup).options.find(
              (item) => item.value === value
            );
            if (selected) break;
          }
        }

        return selected;
      },
      [value]
    );

    const controlledOptions = useMemo(() => {
      const newOptions: SelectOptionItem[] = [];
      options.forEach((option) => {
        if ((option as SelectOptionGroup).options) {
          newOptions.push(...(option as SelectOptionGroup).options);
        } else {
          newOptions.push(option as SelectOptionItem);
        }
      });

      return newOptions;
    }, [options]);

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
      items: controlledOptions,
      itemToString: (item) => (item ? String(item.label) : ""),
      onSelectedItemChange: handleSelectedItemChange,
      selectedItem: controlledValue,
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
      position: {
        x: wrapperRef.current?.offsetLeft || 0, 
        y: (wrapperRef.current?.offsetTop || 0) + stepToNumber(sizes[size].height)
      }
    });

    useEffect(() => {
      if (
        wrapperRef.current &&
        wrapperRef.current.offsetWidth !== dropdownWidth
      ) {
        setDropdownWidth(wrapperRef.current.offsetWidth);
      }
    }, [width, wrapperRef.current, selectedItem]);

    let indexCounter = 0;

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
                selectedItem: selectedItem as SelectOptionItem,
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
            {options.map(
              (item, index) =>
                ((item as SelectOptionGroup).options && (
                  <ul key={`group-${item.label}-${index}`}>
                    <li>{item.label}</li>
                    {(item as SelectOptionGroup).options.map(
                      (groupedITem) => (
                        <li
                          key={`option_grouped${
                            (groupedITem as SelectOptionItem).value
                          }-${indexCounter}`}
                          {...getItemProps({
                            item: groupedITem,
                            index: indexCounter,
                            onClick: () => selectItem(groupedITem),
                          })}
                          data-hover={
                            highlightedIndex === indexCounter++
                          }
                          data-selected={
                            (selectedItem as SelectOptionItem)
                              ?.value ===
                            (groupedITem as SelectOptionItem).value
                          }
                        >
                          {groupedITem.label}
                        </li>
                      )
                    )}
                  </ul>
                )) || (
                  <li
                    key={`option${
                      (item as SelectOptionItem).value
                    }-${indexCounter}`}
                    {...getItemProps({
                      item: item as SelectOptionItem,
                      index: indexCounter,
                      onClick: () =>
                        selectItem(item as SelectOptionItem),
                    })}
                    data-hover={highlightedIndex === indexCounter++}
                    data-selected={
                      (selectedItem as SelectOptionItem)?.value ===
                      (item as SelectOptionItem).value
                    }
                  >
                    {item.label}
                  </li>
                )
            )}
          </ul>
        </Portal>
      </div>
    );
  })
);
