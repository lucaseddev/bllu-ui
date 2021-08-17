import { StyleFunction } from "hooks/useStyles";
import React from "react";

export interface InputTextProps {
  name?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  className?:
    | CSSRule
    | StyleFunction<Omit<InputTextProps, "className" | "onChange">>;
}

export const InputText = React.forwardRef(function InputText(
  props: InputTextProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <div>
      <input ref={ref} />
    </div>
  );
});
