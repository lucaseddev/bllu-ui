import cx from "classnames";
import { style, StyleAttribute } from "glamor";
import { pxStep, StepSize } from "helpers/scale";
import { styled, StyleObject } from "hooks/useStyles";
import React, { useMemo } from "react";
import { LG, MD, resCSS, SM, XL, XL2, XL3, XS } from "types/sizes";

const SIZESCOUNT = 12;
const SPACINGCOUNT = 10;
type SIZES = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SPACING = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface FlexProps {
  children?: React.ReactNode;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "space-evenly";
  alignItems?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";

  xs?: SIZES;
  sm?: SIZES;
  md?: SIZES;
  lg?: SIZES;
  xl?: SIZES;
  xl2?: SIZES;
  xl3?: SIZES;

  spacing?: SPACING;
}

export interface FlexItem
  extends Omit<
    FlexProps,
    "direction" | "justifyContent" | "alignItems" | "spacing"
  > {}
export interface FlexContainer extends FlexProps {}

const item = styled({
  flexGrow: 1,
  flexBasis: 0,
  maxWidth: "100%",
  margin: 0,
});

const container = styled({
  display: "flex",
  flexWrap: "wrap",
  flexGrow: 1,
});

const dir = {
  column: styled({
    flexDirection: "column",
  }),
  "column-reverse": styled({
    flexDirection: "column-reverse",
  }),
  row: styled({ flexDirection: "row" }),
  "row-reverse": styled({ flexDirection: "row-reverse" }),
};

const justify = {
  center: styled({ justifyContent: "center" }),
  "flex-start": styled({ justifyContent: "flex-start" }),
  "flex-end": styled({ justifyContent: "flex-end" }),
  "space-around": styled({ justifyContent: "space-around" }),
  "space-between": styled({ justifyContent: "space-between" }),
  "space-evenly": styled({ justifyContent: "space-evenly" }),
};

const align = {
  center: styled({ alignItems: "center" }),
  "flex-start": styled({ alignItems: "flex-start" }),
  "flex-end": styled({ alignItems: "flex-end" }),
  stretch: styled({ alignItems: "stretch" }),
  baseline: styled({ alignItems: "baseline" }),
};

function generateResponsiveGridSize(
  breakpoint: string,
  stepCount: number
) {
  let style: (StyleObject | string)[] = [];

  style.push("");

  for (let index = 1; index <= stepCount; index++) {
    style.push({});
    style[index] = {
      flexGrow: 0,
      flexBasis: `${100 * (index / stepCount)}%`,
      maxWidth: `${100 * (index / stepCount)}%`,
    };

    if (breakpoint !== XS) {
      style[index] = styled({
        [resCSS[breakpoint]]: style[index],
      });
    } else {
      style[index] = styled(style[index] as StyleObject);
    }
  }

  return style;
}

function generateSpacing(stepCount: number, stepSize: number) {
  let spaces: StyleObject[] = [];

  for (let index = 0; index <= stepCount; index++) {
    spaces.push(
      styled({
        marginLeft: "-" + pxStep(index, stepSize),
        marginTop: "-" + pxStep(index, stepSize),
        width: `calc(100% + ${pxStep(index, stepSize)})`,
        [`& > .${item}`]: {
          paddingLeft: pxStep(index, stepSize),
          paddingTop: pxStep(index, stepSize),
        },
      })
    );
  }

  return spaces;
}

const spaces = generateSpacing(SPACINGCOUNT, StepSize.PX4);

const size = {
  xs: generateResponsiveGridSize(XS, SIZESCOUNT),
  sm: generateResponsiveGridSize(SM, SIZESCOUNT),
  md: generateResponsiveGridSize(MD, SIZESCOUNT),
  lg: generateResponsiveGridSize(LG, SIZESCOUNT),
  xl: generateResponsiveGridSize(XL, SIZESCOUNT),
  xl2: generateResponsiveGridSize(XL2, SIZESCOUNT),
  xl3: generateResponsiveGridSize(XL3, SIZESCOUNT),
};

export namespace Flex {
  export const Item = React.memo(function Item(props: FlexItem) {
    const {
      children,
      xs = 0,
      sm = 0,
      md = 0,
      lg = 0,
      xl = 0,
      xl2 = 0,
      xl3 = 0,
    } = props;

    const classNames = useMemo(
      () =>
        cx({
          [item as any]: true,
          [size["xs"][xs] as string]: !!xs,
          [size["sm"][sm] as string]: !!sm,
          [size["md"][md] as string]: !!md,
          [size["lg"][lg] as string]: !!lg,
          [size["xl"][xl] as string]: !!xl,
          [size["xl2"][xl2] as string]: !!xl2,
          [size["xl3"][xl3] as string]: !!xl3,
        }),
      [xs, sm, md, lg, xl, xl2, xl3]
    );

    return <div className={classNames}>{children}</div>;
  });

  export const Container = React.memo(function Container(
    props: FlexContainer
  ) {
    const {
      children,
      xs = 0,
      sm = 0,
      md = 0,
      lg = 0,
      xl = 0,
      xl2 = 0,
      xl3 = 0,

      spacing = 1,

      direction = "row",
      justifyContent = "flex-start",
      alignItems = "flex-start",
    } = props;

    const classNames = useMemo(
      () =>
        cx({
          [container as any]: true,
          [size["xs"][xs] as string]: !!xs,
          [size["sm"][sm] as string]: !!sm,
          [size["md"][md] as string]: !!md,
          [size["lg"][lg] as string]: !!lg,
          [size["xl"][xl] as string]: !!xl,
          [size["xl2"][xl2] as string]: !!xl2,
          [size["xl3"][xl3] as string]: !!xl3,
          [dir[direction] as any]: true,
          [justify[justifyContent] as any]: true,
          [align[alignItems] as any]: true,
          [spaces[spacing] as any]: true,
        }),
      [
        xs,
        sm,
        md,
        lg,
        xl,
        xl2,
        xl3,
        direction,
        justifyContent,
        alignItems,
        spacing,
      ]
    );

    console.log(classNames);

    return <div className={classNames}>{children}</div>;
  });
}
