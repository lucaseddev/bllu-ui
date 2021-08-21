import { pxStep, remStep, StepSize } from "helpers/scale";
import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import React from "react";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

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
  sm: { height: pxStep(4) },
  md: { height: pxStep(5) },
  lg: { height: pxStep(6), fontSize: remStep(7, StepSize.REM125) },
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

    transition: `border 0.2s, box-shadow 0.2s, background 0.2s ${theme.easings.inOutCubic}`,

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

    '&[aria-invalid="true"], &[data-invalid="true"]': {
      borderColor: `${theme.colors.danger}a3`,

      "&:focus, &:focus-within": {
        boxShadow: `0px 0px 1px 2px ${theme.colors.danger}45`,
      },
    },
  };
};

interface InputAffixProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;

  required?: boolean;
  isInvalid?: boolean;
  disabled?: boolean;

  className?: string;
}

const InputAffixStyle: StyleObject = {
  display: "flex",
  alignItems: "center",

  "& > input": {
    outline: "none",
    border: "none",
    background: "none",

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
};

const InputAffix = React.memo((props: InputAffixProps) => {
  const {
    className,
    prefix,
    suffix,
    children,
    disabled,
    isInvalid,
    ...rest
  } = props;

  const affixStyle = useStyles([className || "", InputAffixStyle], {
    className,
  });

  return (
    <div
      className={affixStyle}
      data-invalid={isInvalid}
      data-disabled={disabled}
    >
      {prefix && <span>{prefix}</span>}
      {children}
      {suffix && <span>{suffix}</span>}
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
    prefix,
    suffix,
    ...rest
  } = props;

  const inputStyle = useStyles([InputStyle], { width, size });

  const element = React.createElement("input", {
    "aria-invalid": isInvalid,
    "aria-required": props.required,
    "aria-disabled": props.disabled,
    className: inputStyle,
    ref: ref,
    ...rest,
  });

  if (prefix || suffix) {
    return (
      <InputAffix
        className={inputStyle}
        prefix={prefix}
        suffix={suffix}
        isInvalid={isInvalid}
        disabled={rest.disabled}
        required={rest.required}
      >
        {React.cloneElement(element, {
          className: "",
          "aria-invalid": undefined,
          "aria-required": undefined,
          "aria-disabled": undefined,
        })}
      </InputAffix>
    );
  }
  return element;
});
