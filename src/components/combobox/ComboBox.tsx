import { InputText } from "components/inputs";
import { Portal } from "components/portal";
import { Spinner } from "components/spinner";
import {
  useCombobox,
  UseComboboxStateChange,
  UseSelectStateChange,
} from "downshift";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { StyleFunction, useStyles } from "hooks/useStyles";
import React, {
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
import { LARGE, MEDIUM, SMALL } from "types/sizes";
import cx from "classnames";

import { useVirtual } from "react-virtual";

export interface ComboBoxOptionItem {
  value: string | number;
  label: string | React.ReactNode;
}

export interface ComboBoxOptionGroup {
  label: string;
  options: ComboBoxOptionItem[];
}

export interface ComboBoxProps {
  width?: string | number;

  size?: SMALL | MEDIUM | LARGE;

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
}

const WrapperStyle: StyleFunction<Omit<ComboBoxProps, "options">> = ({
  width,
}) => ({
  position: "relative",
  width: width || "fit-content",
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

export function ComboBox(props: ComboBoxProps) {
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
    size,
    width,
  } = props;

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
        newOptions.push(
          { label: option.label, value: "group-label" },
          ...(option as ComboBoxOptionGroup).options,
          { label: "", value: "group-divider" }
        );
      } else {
        newOptions.push(option as ComboBoxOptionItem);
      }
    });

    if (
      newOptions.length &&
      newOptions[newOptions.length - 1].value === "group-divider"
    )
      newOptions.pop();

    return newOptions;
  }, [options]);

  const [dropdownWidth, setDropdownWidth] = useState<number>();
  const [inputItems, setInputItems] = useState(controlledOptions);
  const [isHover, setIsHover] = useState<boolean>(false);
  const listRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  } = useCombobox({
    selectedItem: controlledValue,
    items: inputItems,
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
  }, [width, wrapperRef.current, selectedItem]);

  const rowVirtualizer = useVirtual({
    parentRef: listRef,
    size: inputItems.length,
    estimateSize: React.useCallback(
      (index) => {
        switch (inputItems[index].value) {
          case "group-label":
            return 27;
          case "group-divider":
            return 9;
          default:
            return 37;
        }
      },
      [inputItems]
    ),
    overscan: 2,
  });

  return (
    <div
      className={wrapperStyle}
      {...getComboboxProps({
        ref: wrapperRef,
      })}
    >
      <InputText
        width={width}
        size={size}
        isInvalid={isInvalid}
        {...getInputProps({
          placeholder,
          disabled: isLoading || disabled,
          onMouseEnter: () =>
            selectedItem && !suppressClear && setIsHover(true),
          onMouseLeave: () => !suppressClear && setIsHover(false),
          onClick: () => openMenu(),
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
              <span className={suffixStyle}>
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
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            switch (inputItems[virtualRow.index].value) {
              case "group-label":
                return (
                  <li
                    key={`grouped_option${
                      inputItems[virtualRow.index].value
                    }-${virtualRow.index}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: virtualRow.size,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    data-isgroup={true}
                  >
                    {inputItems[virtualRow.index].label}
                  </li>
                );
              case "group-divider":
                return (
                  <li
                    key={`group_divider-${virtualRow.index}`}
                    style={{
                      position: "absolute",
                      top: 0,
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
                      inputItems[virtualRow.index].value
                    }-${virtualRow.index}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: virtualRow.size,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    {...getItemProps({
                      item: inputItems[virtualRow.index],
                      index: virtualRow.index,
                      onClick: () =>
                        selectItem(inputItems[virtualRow.index]),
                    })}
                    data-hover={highlightedIndex === virtualRow.index}
                    data-selected={
                      inputItems[virtualRow.index].value ===
                      selectedItem?.value
                    }
                  >
                    {inputItems[virtualRow.index].label}
                  </li>
                );
            }
          })}
        </ul>
      </Portal>
    </div>
  );
}
