import cx from "classnames";
import { pxStep, StepSize } from "helpers/scale";
import { isNumber, isString } from "helpers/validations";
import {
  StyleFunction,
  StyleObject,
  useStyles,
} from "hooks/useStyles";
import React from "react";

const baseStyle: StyleObject = {};

const style: {
  [size: string]:
    | StyleObject
    | StyleFunction<Omit<SpinnerProps, "size"> & { size: number }>;
} = {
  sm: {
    width: pxStep(8, StepSize.PX2),
    height: pxStep(8, StepSize.PX2),
  },
  md: {
    width: pxStep(9, StepSize.PX2),
    height: pxStep(9, StepSize.PX2),
  },
  lg: {
    width: pxStep(10, StepSize.PX2),
    height: pxStep(10, StepSize.PX2),
  },
  xl: {
    width: pxStep(11, StepSize.PX2),
    height: pxStep(11, StepSize.PX2),
  },
  custom: ({ size }) => ({ width: size, height: size }),
};

export interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string | StyleObject;
}

export function Spinner(props: SpinnerProps) {
  const { size = "md", className } = props;

  const themedStyles = useStyles([baseStyle, style[size || "md"]], {
    size:
      (isString(size) && size) || (isNumber(size) && size) || "md",
  });

  return (
    <div className={cx(themedStyles, className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <path d="M96.856 50.341C96.856 24.47 75.872 3.485 50 3.485S3.144 24.47 3.144 50.341m7.945 0c0-21.39 17.317-38.91 38.911-38.91s38.91 17.52 38.91 38.91">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
