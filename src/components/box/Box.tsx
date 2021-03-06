import React, { useMemo } from "react";
import { styled } from "hooks/useStyles";
import cx from "classnames";
import { pxStep, StepSize } from "helpers/scale";

const ROUNDEDCOUNT = 10;
type RoundedSizes =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | "full";
// const ELEVATIONCOUNT = 10;
type ElevationSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const PADDINGCOUNT = 11;
type PaddingSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const MARGINCOUNT = 11;
type MarginSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  rounded?: RoundedSizes;
  elevation?: ElevationSizes;
  border?: 0 | 1 | 2;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted";

  as?: string;

  p?: PaddingSizes;
  px?: PaddingSizes;
  py?: PaddingSizes;
  pl?: PaddingSizes;
  pr?: PaddingSizes;
  pb?: PaddingSizes;
  pt?: PaddingSizes;

  m?: MarginSizes;
  mx?: MarginSizes;
  my?: MarginSizes;
  ml?: MarginSizes;
  mr?: MarginSizes;
  mt?: MarginSizes;
  mb?: MarginSizes;

  bg?: string;

  w?: number | string;
  h?: number | string;
  minw?: number | string;
  minh?: number | string;
}

function generateRounded(roundedCount: number, stepSize: number) {
  return Object.assign(
    { [`&.rounded-full`]: { borderRadius: 9999 } },
    ...Array(roundedCount)
      .fill(0)
      .map((_, i) => ({
        [`&.rounded-${i}`]: {
          borderRadius: pxStep(i, stepSize),
        },
      }))
  );
}

function generateAxis(
  axis: string,
  type: string,
  count: number,
  stepSize: number
) {
  return Object.assign(
    {},
    ...Array(count)
      .fill(0)
      .map((_, i) => ({
        [`&.${type[0]}${axis}-${i}`]: {
          [`${type}${axis === "x" ? "Left" : "Top"}`]: pxStep(
            i,
            stepSize
          ),
          [`${type}${axis === "x" ? "Right" : "Bottom"}`]: pxStep(
            i,
            stepSize
          ),
        },
      }))
  );
}

function generateSide(
  side: string,
  type: string,
  count: number,
  stepSize: number
) {
  return Object.assign(
    {},
    ...Array(count)
      .fill(0)
      .map((_, i) => ({
        [`&.${type[0]}${side[0] || ""}-${i}`]: {
          [`${type}${
            side.charAt(0).toUpperCase() + side.slice(1) || ""
          }`]: pxStep(i, stepSize),
        },
      }))
  );
}

const boxStyle = styled({
  ...generateSide("", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("", "margin", PADDINGCOUNT, StepSize.PX4),

  ...generateAxis("x", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateAxis("y", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateAxis("x", "margin", MARGINCOUNT, StepSize.PX4),
  ...generateAxis("y", "margin", MARGINCOUNT, StepSize.PX4),

  ...generateSide("left", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("right", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("top", "padding", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("bottom", "padding", PADDINGCOUNT, StepSize.PX4),

  ...generateSide("left", "margin", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("right", "margin", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("top", "margin", PADDINGCOUNT, StepSize.PX4),
  ...generateSide("bottom", "margin", PADDINGCOUNT, StepSize.PX4),

  ...generateRounded(ROUNDEDCOUNT, StepSize.PX4),

  [`&.border-0`]: { borderWidth: 0 },
  [`&.border-1`]: { borderWidth: 1 },
  [`&.border-2`]: { borderWidth: 2 },

  [`&.border-solid`]: { borderStyle: "solid" },
  [`&.border-dashed`]: { borderStyle: "dashed" },
  [`&.border-dotted`]: { borderStyle: "dotted" },
});

const cardThemedStyle = styled<Omit<BoxProps, "children">>(
  ({
    theme,
    borderColor = theme.colors.defaultStroke,
    bg = theme.colors.default,
    h = "auto",
    minh = "0",
    w = "auto",
    minw = "0",
  }) => {
    return {
      borderColor: borderColor,
      background: bg,
      height: h,
      width: w,
      minWidth: minw,
      minHeight: minh,
    };
  }
);

export const Box = React.memo(
  React.forwardRef(function (
    props: BoxProps,
    ref: React.ForwardedRef<HTMLElement>
  ) {
    const {
      as = "div",
      children,
      rounded = 1,
      elevation,
      border = 0,
      borderColor,
      borderStyle = "solid",
      bg,
      p,
      px,
      py,
      pl,
      pr,
      pb,
      pt,
      m,
      mx,
      my,
      ml,
      mr,
      mb,
      mt,
      w,
      h,
      minw,
      minh,
      className,
      ...rest
    } = props;

    const classNames = useMemo(
      () =>
        cx({
          [boxStyle.toString()]: true,
          [`rounded-${rounded}`]: true,
          [`border-${border}`]: true,
          [`border-${borderStyle}`]: true,
          [`p-${p}`]: !!p ?? true,
          [`px-${px}`]: !!px ?? true,
          [`py-${py}`]: !!py ?? true,
          [`pl-${pl}`]: !!pl ?? true,
          [`pr-${pr}`]: !!pr ?? true,
          [`pb-${pb}`]: !!pb ?? true,
          [`pt-${pt}`]: !!pt ?? true,
          [`m-${m}`]: !!m ?? true,
          [`mx-${mx}`]: !!mx ?? true,
          [`my-${my}`]: !!my ?? true,
          [`ml-${ml}`]: !!ml ?? true,
          [`mr-${mr}`]: !!mr ?? true,
          [`mb-${mb}`]: !!mb ?? true,
          [`mt-${mt}`]: !!mt ?? true,
        }),
      [rounded, elevation]
    );

    return React.createElement(
      as,
      {
        className: cx(
          cardThemedStyle({ borderColor, bg, w, h, minw, minh }),
          classNames,
          className
        ),
        ref,
        ...rest,
      },
      children
    );
  })
);
