import classNames from "classnames";
import { emStep, remStep, StepSize } from "helpers";
import { styled } from "hooks";
import React from "react";
import { LG, MD, SM, XL, XL2, XL3, XL4, XS } from "types";

import {
  TextWeight,
  TextNoGutter,
  TextNoWrap,
  TextAlign,
  TextProps,
} from "../text";

export interface HeadingProps
  extends Omit<TextProps, "children" | "as"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;

  size?: XS | SM | MD | LG | XL | XL2 | XL3 | XL4;
}

export const HeadingBaseStyle = styled({
  margin: `0px 0px ${emStep(4, StepSize.REM125)}`,
});

export const HeadingSizes = {
  [XS]: styled({ fontSize: remStep(7, StepSize.REM125) }),
  [SM]: styled({ fontSize: remStep(8, StepSize.REM125) }),
  [MD]: styled({ fontSize: remStep(5, StepSize.REM25) }),
  [LG]: styled({ fontSize: remStep(6, StepSize.REM25) }),
  [XL]: styled({ fontSize: remStep(7, StepSize.REM25) }),
  [XL2]: styled({ fontSize: remStep(8, StepSize.REM25) }),
  [XL3]: styled({ fontSize: remStep(12, StepSize.REM25) }),
  [XL4]: styled({ fontSize: remStep(16, StepSize.REM25) }),
};

export const HeadingsStyle = {
  h1: HeadingSizes[XL4],
  h2: HeadingSizes[XL2],
  h3: HeadingSizes[XL],
  h4: HeadingSizes[LG],
  h5: HeadingSizes[MD],
  h6: HeadingSizes[SM],
};

export const Heading = React.memo(
  React.forwardRef(function (
    {
      as = "h2",
      children,
      weight = "bold",
      size = "md",
      noWrap = false,
      noGutter = false,
      align = "inherit",
    }: HeadingProps,
    ref
  ) {
    return React.createElement(
      as,
      {
        className: classNames(
          !size && HeadingsStyle[as],
          HeadingBaseStyle,
          HeadingSizes[size],
          TextWeight[weight],
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
