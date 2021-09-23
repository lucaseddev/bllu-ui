import React, { useMemo } from "react";
import { styled, StyleObject } from "hooks/useStyles";
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
type ElevationSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface BoxProps {
  children: React.ReactNode;
  rounded?: RoundedSizes;
  elevation?: ElevationSizes;
  border?: 0 | 1 | 2;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted";

  p?: number;
  px?: number;
  py?: number;

  m?: number;
  mx?: number;
  my?: number;
}

function generateRounded(roundedCount: number, stepSize: number) {
  let sizes: { [key: string | number]: StyleObject } = {};

  for (let index = 0; index <= roundedCount; index++) {
    sizes[index] = styled({
      borderRadius: pxStep(index, stepSize),
    });
  }

  sizes["full"] = styled({
    borderRadius: 9999,
  });

  return sizes;
}

const roundedStyle = generateRounded(ROUNDEDCOUNT, StepSize.PX4);
const borderWidth = {
  0: styled({
    borderWidth: 0,
  }),
  1: styled({
    borderWidth: 1,
  }),
  2: styled({
    borderWidth: 2,
  }),
};

const cardThemedStyle = styled<Omit<BoxProps, "children">>(
  ({
    theme,
    borderColor = theme.colors.defaultStroke,
    borderStyle = "solid",
  }) => ({
    borderColor: borderColor,
    borderStyle: borderStyle,
  })
);

export function Box(props: BoxProps) {
  const {
    children,
    rounded = 1,
    elevation,
    border = 1,
    borderColor,
    borderStyle,
  } = props;

  const classNames = useMemo(
    () =>
      cx({
        [cardThemedStyle({ borderColor, borderStyle }) as any]: true,
        [roundedStyle[rounded] as any]: true,
        [borderWidth[border] as any]: true,
      }),
    [rounded, elevation]
  );

  return <div className={classNames}>{children}</div>;
}
