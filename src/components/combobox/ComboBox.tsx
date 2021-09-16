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
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleFill,
} from "react-icons/ri";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

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

const InputBoxStyle: StyleFunction<
  Omit<ComboBoxProps, "options">
> = ({ theme, size }) => ({});

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
    options.forEach((option) => {
      if ((option as ComboBoxOptionGroup).options) {
        newOptions.push(...(option as ComboBoxOptionGroup).options);
      } else {
        newOptions.push(option as ComboBoxOptionItem);
      }
    });

    return newOptions;
  }, [options]);

  const [inputItems, setInputItems] = useState(controlledOptions);
  const [isHover, setIsHover] = useState<boolean>(false);
  const listRef = useRef<HTMLElement>(null);

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
  } = useCombobox({
    selectedItem: controlledValue,
    items: inputItems,
  });

  const inputBoxStyle = useStyles([InputBoxStyle]);
  const suffixStyle = useStyles([SuffixStyle]);
  const spinnerStyle = useStyles([SpinnerStyle]);
  const listStateStyle = useStyles([ListStateStyle], {
    isOpen,
  });

  return (
    <div {...getComboboxProps()}>
      <InputText
        width={width}
        size={size}
        className={inputBoxStyle}
        isInvalid={isInvalid}
        {...getInputProps({
          placeholder,
          disabled: isLoading || disabled,
          onMouseEnter: () =>
            selectedItem && !suppressClear && setIsHover(true),
          onMouseLeave: () => !suppressClear && setIsHover(false),
          onClick: (event) => openMenu(),
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
          className={listStateStyle}
          {...getMenuProps({ ref: listRef })}
        >
          <li>teste</li>
        </ul>
      </Portal>
    </div>
  );
}
