import cx from "classnames";
import { css, keyframes, Rule } from "glamor";
import { pxStep, StepSize } from "helpers/scale";
import { CSSRule, useStyles } from "hooks/useStyles";
import React from "react";

const baseStyle: CSSRule = {};

const style: { [size: string]: CSSRule } = {
  sm: {
    width: pxStep(3, StepSize.PX4),
    height: pxStep(3, StepSize.PX4),
  },
  md: {
    width: pxStep(4, StepSize.PX4),
    height: pxStep(4, StepSize.PX4),
  },
  lg: {
    width: pxStep(5, StepSize.PX4),
    height: pxStep(5, StepSize.PX4),
  },
  xl: {
    width: pxStep(6, StepSize.PX4),
    height: pxStep(6, StepSize.PX4),
  },
};

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string | CSSRule;
}

export function Spinner(props: SpinnerProps) {
  const { size, className } = props;

  const themedStyles = useStyles([baseStyle, style[size || "md"]], {
    size,
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
