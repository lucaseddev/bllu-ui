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

  xs?: SIZES | boolean;
  sm?: SIZES | boolean;
  md?: SIZES | boolean;
  lg?: SIZES | boolean;
  xl?: SIZES | boolean;
  xl2?: SIZES | boolean;
  xl3?: SIZES | boolean;

  spacing?: SPACING;
}

export interface FlexItemProps
  extends Omit<
    FlexProps,
    "direction" | "justifyContent" | "alignItems" | "spacing"
  > {}
export interface FlexContainerProps extends FlexProps {
  h?: string | number;
}

const item = styled({
  flexBasis: 0,
  maxWidth: "100%",
  margin: 0,
});

const container = styled<FlexContainerProps>(({ h = "auto" }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexGrow: 1,
  height: h,
}));

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
  let style: { [key: number | string]: StyleObject | string } = {};

  style[new Boolean(true).toString()] = {
    flexGrow: 1,
  };

  if (breakpoint !== XS)
    style[new Boolean(true).toString()] = styled({
      [resCSS[breakpoint]]: style[new Boolean(true).toString()],
    });
  else
    style[new Boolean(true).toString()] = styled(
      style[new Boolean(true).toString()] as StyleObject
    );

  for (let index = 1; index <= stepCount; index++) {
    style[index.toString()] = {
      flexGrow: 0,
      flexBasis: `${100 * (index / stepCount)}%`,
      maxWidth: `${100 * (index / stepCount)}%`,
    };

    if (breakpoint !== XS) {
      style[index.toString()] = styled({
        [resCSS[breakpoint]]: style[index.toString()],
      });
    } else {
      style[index.toString()] = styled(
        style[index.toString()] as StyleObject
      );
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
  export const Item = React.memo(function Item(props: FlexItemProps) {
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
          [size["xs"][xs.toString()] as string]: !!xs,
          [size["sm"][sm.toString()] as string]: !!sm,
          [size["md"][md.toString()] as string]: !!md,
          [size["lg"][lg.toString()] as string]: !!lg,
          [size["xl"][xl.toString()] as string]: !!xl,
          [size["xl2"][xl2.toString()] as string]: !!xl2,
          [size["xl3"][xl3.toString()] as string]: !!xl3,
        }),
      [xs, sm, md, lg, xl, xl2, xl3]
    );

    return <div className={classNames}>{children}</div>;
  });

  export const Container = React.memo(function Container(
    props: FlexContainerProps
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

      h,
    } = props;

    const classNames = useMemo(
      () =>
        cx({
          [size["xs"][xs.toString()] as string]: !!xs,
          [size["sm"][sm.toString()] as string]: !!sm,
          [size["md"][md.toString()] as string]: !!md,
          [size["lg"][lg.toString()] as string]: !!lg,
          [size["xl"][xl.toString()] as string]: !!xl,
          [size["xl2"][xl2.toString()] as string]: !!xl2,
          [size["xl3"][xl3.toString()] as string]: !!xl3,
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

    return (
      <div className={`${container({ h })} ${classNames}`}>
        {children}
      </div>
    );
  });
}
