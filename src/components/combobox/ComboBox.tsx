import { InputText, InputTextProps } from "components/inputs";
import { Portal } from "components/portal";
import { Spinner } from "components/spinner";
import {
  useCombobox,
  UseComboboxStateChange,
  UseComboboxStateChangeTypes,
} from "downshift";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { StyleFunction, useStyles } from "hooks/useStyles";
import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleFill,
} from "react-icons/ri";
import { LG, MD, SM } from "types/sizes";
import cx from "classnames";

import { useVirtual } from "react-virtual";
import debounce from "lodash.debounce";
import * as fuzzaldrin from "fuzzaldrin-plus";

export interface ComboBoxOptionItem {
  value: string | number;
  label: string;
}

export interface ComboBoxOptionGroup {
  label: string;
  options: ComboBoxOptionItem[];
}

export interface ComboBoxProps {
  width?: string | number;

  size?: SM | MD | LG;

  options: (ComboBoxOptionGroup | ComboBoxOptionItem)[];

  value?: string | number;
  onChange?: (value: ComboBoxOptionItem | null) => void;
  onBlur?: (value: ComboBoxOptionItem | null) => void;

  placeholder?: string;
  name?: string;
  id?: string;

  suppressClear?: boolean;

  disabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;

  inputRef?: React.Ref<HTMLInputElement>;
}

const WrapperStyle: StyleFunction<Omit<ComboBoxProps, "options">> = ({
  width,
  theme,
}) => ({
  position: "relative",
  width: width || "auto",
  display: "inline-block",

  "&:hover:not([data-disabled='true']), &[aria-expanded='true']": {
    "& > div > span > span:first-child:not([data-ishover])": {
      color: theme.colors.onDefault,
    },
  },
});

// const InputBoxStyle: StyleFunction<
//   Omit<ComboBoxProps, "options">
// > = ({ theme, size }) => ({});

const SuffixStyle: StyleFunction<Omit<ComboBoxProps, "options">> = ({
  theme,
}) => ({
  color: theme.colors.defaultStroke,
  transition: `color 0.1s ${theme.easings.inOutCubic}`,
  width: pxStep(9, StepSize.PX2),

  borderRadius: "50%",

  marginLeft: pxStep(3, StepSize.PX4),
  display: "flex",
  fontSize: 16,

  alignItems: "center",
  justifyContent: "center",

  "&[data-ishover]": {
    "&:hover": {
      color: theme.colors.onDefault,
    },
  },
});

const ListStyle: StyleFunction<Omit<ComboBoxProps, "options">> = ({
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

  "& > li:not([data-isgroup='true']):not([data-isdivider='true']):not(:first-child)": {
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

  "& li[data-isgroup='true']": {
    fontSize: 10,
    fontWeight: "bold",
    padding: `${pxStep(2, StepSize.PX4)} ${pxStep(3, StepSize.PX4)}`,
  },

  "& li[data-isdivider='true']:not(:last-child)": {
    "&::after": {
      content: " ",
      display: "block",
      background: theme.colors.surfaceStroke,
      height: 1,
      width: "100%",
      margin: `${pxStep(1, StepSize.PX4)} 0`,
    },
  },

  "& > li[data-nooption]": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.defaultStroke,
  },
});

const SpinnerStyle: StyleFunction<Omit<ComboBoxProps, "options">> = ({
  theme,
}) => ({
  fill: theme.colors.defaultStroke,
  marginLeft: pxStep(3, StepSize.PX4),
});

const ListStateStyle: StyleFunction<{ isOpen: boolean }> = ({
  isOpen,
}) => ({
  transform: isOpen ? "translateX(0px)" : "translateX(-1000%)",
});

export const ComboBox = React.memo(function ComboBox(
  props: ComboBoxProps
) {
  const {
    options,
    value,
    placeholder,
    onChange,
    onBlur,
    isLoading,
    isInvalid,
    disabled,
    suppressClear,
    size = "md",
    width,
    inputRef,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const [isHover, setIsHover] = useState<boolean>(false);
  const listRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectedItemChange = useCallback(
    (value: UseComboboxStateChange<ComboBoxOptionItem>) => {
      onChange && onChange(value.selectedItem || null);
    },
    [onChange]
  );

  const handleSelectedItemBlur = useCallback(
    (value: UseComboboxStateChange<ComboBoxOptionItem>) => {
      onBlur && onBlur(value.selectedItem || null);
    },
    [onBlur]
  );

  const controlledValue = useMemo(
    function findSelectedItem() {
      let selected: ComboBoxOptionItem | undefined;

      for (let index = 0; index < options.length; index++) {
        const v = options[index];

        if (
          !!(v as ComboBoxOptionItem).value &&
          (v as ComboBoxOptionItem).value === value
        ) {
          selected = v as ComboBoxOptionItem;
          break;
        } else if ((v as ComboBoxOptionGroup).options) {
          selected = (v as ComboBoxOptionGroup).options.find(
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
    const newOptions: ComboBoxOptionItem[] = [];
    options.forEach((option, index) => {
      if ((option as ComboBoxOptionGroup).options) {
        if (inputValue?.length) {
          const filteredOptions = (option as ComboBoxOptionGroup).options.filter(
            (item) => fuzzaldrin.match(item.label, inputValue).length
          );

          if (filteredOptions.length) {
            newOptions.push(
              { label: option.label, value: "group-label" },
              ...filteredOptions,
              { label: "", value: "group-divider" }
            );
          }
        } else {
          newOptions.push(
            { label: option.label, value: "group-label" },
            ...(option as ComboBoxOptionGroup).options,
            { label: "", value: "group-divider" }
          );
        }
      } else if (
        !inputValue.length ||
        fuzzaldrin.match(
          (option as ComboBoxOptionItem).label,
          inputValue
        ).length
      ) {
        newOptions.push(option as ComboBoxOptionItem);
      }
    });

    if (
      newOptions.length &&
      newOptions[newOptions.length - 1].value === "group-divider"
    )
      newOptions.pop();

    return newOptions;
  }, [options, inputValue]);

  const debounceUpdateInputValue = useCallback(
    ({ inputValue: newValue }) => {
      setInputValue(newValue || "");
    },
    []
  );

  const {
    selectedItem,
    isOpen,
    openMenu,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    setInputValue: setComboBoxInputValue,
  } = useCombobox({
    selectedItem: controlledValue,
    onSelectedItemChange: handleSelectedItemChange,
    items: controlledOptions,
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex &&
      highlightedIndex !== -1 &&
      rowVirtualizer.scrollToIndex(highlightedIndex),

    itemToString: (item) => (item ? String(item.label) : ""),
    onInputValueChange: debounce(debounceUpdateInputValue, 100),
    onIsOpenChange: ({ selectedItem, isOpen, type }) => {
      if (
        type === useCombobox.stateChangeTypes.InputBlur &&
        !isOpen &&
        inputValue !== selectedItem?.label
      ) {
        setComboBoxInputValue(selectedItem?.label || "");
      }
    },
  });

  const wrapperStyle = useStyles([WrapperStyle], {
    width: width,
  });
  // const inputBoxStyle = useStyles([InputBoxStyle]);
  const suffixStyle = useStyles([SuffixStyle]);
  const spinnerStyle = useStyles([SpinnerStyle]);
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
  }, [width, wrapperRef.current, selectedItem, isInvalid]);

  const rowVirtualizer = useVirtual({
    parentRef: listRef,
    size: controlledOptions.length,
    estimateSize: React.useCallback(
      (index) => {
        switch (controlledOptions[index].value) {
          case "group-label":
            return 27;
          case "group-divider":
            return 9;
          default:
            return 37;
        }
      },
      [controlledOptions]
    ),
    overscan: 2,
  });

  return (
    <div
      className={wrapperStyle}
      {...getComboboxProps({
        ref: wrapperRef,
        onMouseEnter: () =>
          selectedItem && !suppressClear && setIsHover(true),
        onMouseLeave: () => !suppressClear && setIsHover(false),
      })}
      data-disabled={isLoading || disabled}
    >
      <InputText
        width={width}
        size={size}
        isInvalid={isInvalid}
        {...getInputProps({
          ...rest,
          type: "text",
          placeholder,
          disabled: isLoading || disabled,
          ref: inputRef,
          onClick: () => openMenu(),
          onBlur: () =>
            !isOpen &&
            handleSelectedItemBlur({
              selectedItem: selectedItem as ComboBoxOptionItem,
              highlightedIndex,
              inputValue,
              isOpen,
              type: useCombobox.stateChangeTypes.InputBlur,
            }),
        })}
        suffix={
          isHover ? (
            <span
              className={suffixStyle}
              data-ishover
              onClick={(event) => {
                // @ts-ignore
                selectItem(undefined);
                handleSelectedItemChange({
                  selectedItem: undefined,
                  type:
                    useCombobox.stateChangeTypes.FunctionSelectItem,
                });
                setIsHover(false);
                event.stopPropagation();
              }}
            >
              <RiCloseCircleFill />
            </span>
          ) : (
            (isLoading && <Spinner className={spinnerStyle} />) || (
              <span
                className={suffixStyle}
                {...getToggleButtonProps()}
              >
                {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
            )
          )
        }
      />
      <Portal>
        <ul
          className={cx(listStyle, listStateStyle)}
          {...getMenuProps({ ref: listRef })}
        >
          <li
            key="total-size"
            style={{ height: rowVirtualizer.totalSize }}
          />
          {(rowVirtualizer.virtualItems.length &&
            rowVirtualizer.virtualItems.map((virtualRow) => {
              switch (controlledOptions[virtualRow.index].value) {
                case "group-label":
                  return (
                    <li
                      key={`grouped_option${
                        controlledOptions[virtualRow.index].value
                      }-${virtualRow.index}`}
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 0,
                        width: "100%",
                        height: virtualRow.size,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      data-isgroup={true}
                    >
                      {controlledOptions[virtualRow.index].label}
                    </li>
                  );
                case "group-divider":
                  return (
                    <li
                      key={`group_divider-${virtualRow.index}`}
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 0,
                        width: "100%",
                        height: virtualRow.size,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      data-isdivider={true}
                    />
                  );
                default:
                  return (
                    <li
                      key={`group_option${
                        controlledOptions[virtualRow.index].value
                      }-${virtualRow.index}`}
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 0,
                        width: "100%",
                        height: virtualRow.size,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                      {...getItemProps({
                        item: controlledOptions[virtualRow.index],
                        index: virtualRow.index,
                        onClick: () =>
                          selectItem(
                            controlledOptions[virtualRow.index]
                          ),
                      })}
                      data-hover={
                        highlightedIndex === virtualRow.index
                      }
                      data-selected={
                        controlledOptions[virtualRow.index].value ===
                        selectedItem?.value
                      }
                    >
                      {controlledOptions[virtualRow.index].label}
                    </li>
                  );
              }
            })) || <li data-nooption>No options</li>}
        </ul>
      </Portal>
    </div>
  );
});
