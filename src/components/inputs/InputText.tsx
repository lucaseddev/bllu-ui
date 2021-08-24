import { pxStep, remStep, StepSize } from "helpers/scale";
import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import React from "react";
import { LARGE, MEDIUM, SMALL } from "types/sizes";
import { Spinner } from "components/spinner";

export interface InputTextProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "type" | "className"
  > {
  width?: string | number;
  size?: SMALL | MEDIUM | LARGE;

  className?:
    | StyleObject
    | StyleFunction<Omit<InputTextProps, "className" | "onChange">>;

  isLoading?: boolean;
  isInvalid?: boolean;
  disabled?: boolean;
  required?: boolean;

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | string;
}

const sizes = {
  sm: { height: pxStep(4), fontSize: remStep(7, StepSize.REM125) },
  md: { height: pxStep(5), fontSize: remStep(7, StepSize.REM125) },
  lg: { height: pxStep(6), fontSize: remStep(8, StepSize.REM125) },
};

export const InputStyle: StyleFunction<InputTextProps> = ({
  theme,
  size,
  width,
}) => {
  return {
    ...sizes[size || MEDIUM],
    border: `1px solid ${theme.colors.defaultStroke}`,
    borderRadius: pxStep(1, StepSize.PX4),
    width: width || "fit-content",

    paddingLeft: pxStep(3, StepSize.PX4),
    paddingRight: pxStep(3, StepSize.PX4),

    transition: `border 0.2s, box-shadow 0.2s, background 0.2s, fill 0.2s ${theme.easings.inOutCubic}`,

    display: "flex",
    alignItems: "center",

    "& > input": {
      outline: "none",
      border: "none",
      background: "none",
      padding: 0,

      flexGrow: 1,

      height: "100%",

      ":disabled": {
        cursor: "not-allowed",
      },
    },

    "& > span:last-child": {
      display: "flex",
      alignItems: "center",
      marginLeft: pxStep(1, StepSize.PX4),
    },

    "& > span:first-child": {
      display: "flex",
      alignItems: "center",
      marginRight: pxStep(1, StepSize.PX4),
    },

    "& > div:last-child": {
      display: "flex",
      alignItems: "center",
      marginLeft: pxStep(1, StepSize.PX4),
      fill: theme.colors.defaultStroke,

      transition: `fill 0.2s ${theme.easings.inOutCubic}`,
    },

    "&:focus, &:focus-within": {
      boxShadow: `0px 0px 1px 2px ${theme.colors.primary}45`,
      borderColor: `${theme.colors.primary}a3`,
    },

    ":disabled, &[data-disabled='true']": {
      cursor: "not-allowed",
      background: theme.colors.surface,
    },

    ":focus-visible": {
      outline: "none",
    },

    '&[data-invalid="true"]': {
      borderColor: `${theme.colors.danger}a3`,

      "&:focus, &:focus-within": {
        boxShadow: `0px 0px 1px 2px ${theme.colors.danger}45`,
      },

      "& > div:last-child": {
        fill: theme.colors.danger,
      },
    },
  };
};

interface InputAffixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;

  isInvalid?: boolean;
  isLoading?: boolean;
  disabled?: boolean;

  className?: string;
}

const InputAffix = React.memo((props: InputAffixProps) => {
  const {
    className,
    prefix,
    suffix,
    children,
    disabled,
    isInvalid,
    isLoading,
  } = props;

  const affixStyle = useStyles([className || ""], {
    className,
  });

  return (
    <div
      className={affixStyle}
      data-invalid={isInvalid}
      data-disabled={disabled || isLoading}
    >
      {prefix && <span>{prefix}</span>}
      {children}
      {suffix && <span>{suffix}</span>}
      {isLoading ? (
        <Spinner />
      ) : (
        isInvalid && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
            >
              <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
          </div>
        )
      )}
    </div>
  );
});

export const InputText = React.forwardRef(function InputText(
  props: InputTextProps,
  ref?: React.Ref<HTMLInputElement>
) {
  const {
    className,
    size = MEDIUM,
    width,
    isInvalid = false,
    isLoading = false,
    prefix,
    suffix,
    disabled,
    ...rest
  } = props;

  const inputStyle = useStyles([InputStyle], { width, size });

  return (
    <InputAffix
      className={inputStyle}
      prefix={prefix}
      suffix={suffix}
      isInvalid={isInvalid}
      isLoading={isLoading}
      disabled={disabled}
    >
      <input
        aria-invalid={isInvalid}
        aria-required={props.required}
        aria-disabled={disabled || isLoading}
        disabled={disabled || isLoading}
        ref={ref}
        {...rest}
      />
    </InputAffix>
  );
});
