import classNames from "classnames";
import { emStep, remStep, StepSize } from "helpers";
import { styled } from "hooks";
import React from "react";
import { LG, MD, SM, XL, XL2, XL3, XL4, XL5, XL6, XS } from "types";

export interface TextProps {
  noWrap?: boolean;
  noGutter?: boolean;
  align?: "center" | "justify" | "left" | "right" | "inherit";
  children: React.ReactNode;
  as?:
    | "i"
    | "u"
    | "abbr"
    | "cite"
    | "del"
    | "em"
    | "ins"
    | "kbd"
    | "mark"
    | "s"
    | "samp"
    | "sub"
    | "sup"
    | "p"
    | "strong"
    | "small";

  size?: XS | SM | MD | LG | XL | XL2 | XL3 | XL4 | XL5 | XL6;

  weight?: "thin" | "normal" | "medium" | "bold" | "bolder";
}

export const TextWeight = {
  thin: styled({ fontWeight: 300 }),
  normal: styled({ fontWeight: 400 }),
  medium: styled({ fontWeight: 600 }),
  bold: styled({ fontWeight: 700 }),
  bolder: styled({ fontWeight: 900 }),
};

export const TextBaseStyle = styled({
  margin: `0px 0px ${emStep(3, StepSize.REM125)}`,
});

export const TextAlign = {
  left: styled({ textAlign: "left" }),
  right: styled({ textAlign: "right" }),
  center: styled({ textAlign: "center" }),
  justify: styled({ textAlign: "justify" }),
  inherit: styled({ textAlign: "inherit" }),
};

export const TextSizes = {
  [XS]: styled({ fontSize: remStep(6, StepSize.REM125) }),
  [SM]: styled({ fontSize: remStep(7, StepSize.REM125) }),
  [MD]: styled({ fontSize: remStep(4, StepSize.REM25) }),
  [LG]: styled({ fontSize: remStep(5, StepSize.REM25) }),
  [XL]: styled({ fontSize: remStep(6, StepSize.REM25) }),
  [XL2]: styled({ fontSize: remStep(8, StepSize.REM25) }),
  [XL3]: styled({ fontSize: remStep(9, StepSize.REM25) }),
  [XL4]: styled({ fontSize: remStep(10, StepSize.REM25) }),
  [XL5]: styled({ fontSize: remStep(11, StepSize.REM25) }),
  [XL6]: styled({ fontSize: remStep(12, StepSize.REM25) }),
};

export const TextNoWrap = [
  "",
  styled({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
];

export const TextNoGutter = [
  "",
  styled({
    marginBottom: 0,
  }),
];

export const Text = React.memo(
  React.forwardRef(function (
    {
      as = "p",
      size = MD,
      align = "inherit",
      noGutter = false,
      noWrap = false,
      children,
      weight = "normal",
    }: TextProps,
    ref
  ) {
    return React.createElement(
      as,
      {
        className: classNames(
          TextBaseStyle,
          TextSizes[size],
          TextNoWrap[+noWrap],
          TextNoGutter[+noGutter],
          TextWeight[weight],
          TextAlign[align]
        ),
        ref,
      },
      children
    );
  })
);
