// import cxs, { CSSObject } from "cxs";
import React from "react";
import { LARGE, MEDIUM, SMALL } from "types/sizes";

export const PRIMARY = "primary";
export const SECONDARY = "secondary";
export const LINK = "link";

export type PRIMARY = typeof PRIMARY;
export type SECONDARY = typeof SECONDARY;
export type LINK = typeof LINK;

export type ButtonAppearance = PRIMARY | SECONDARY | LINK;

export interface ButtonProps {
  text: string;

  submit: boolean;

  // Appearance
  type: ButtonAppearance;

  // States
  disabled: boolean;
  isLoading: boolean;

  // Sizes
  size: SMALL | MEDIUM | LARGE;
}

// const appearance = {
//   primary: (theme) => {},
//   secondary: (theme) => {},
//   link: (theme) => {},
// };

export function Button(props: ButtonProps) {
  const {
    text,
    submit,
    size,
    isLoading,
    disabled,
    type,
    ...rest
  } = props;

  console.log(rest);

  return (
    <button type={(submit && "submit") || "button"}>{text}</button>
  );
}
