import { CSSRule, StyleFunction, useStyles } from "hooks/useStyles";
import React from "react";
import { IconType } from "react-icons";
import cx from "classnames";
import arrify from "arrify";

import * as ReactIs from "react-is";

export interface IconProps {
  size?: number;
  icon: IconType | JSX.Element;
  color?: string;
  className?: string | CSSRule;
}

const wrapperStyle: StyleFunction<IconProps> = ({
  theme,
  size,
  color,
}) => {
  return {
    display: "flex",
    alignItems: "center",
    fontSize: size || 16,
    color: color,
  };
};

function Icon(props: IconProps) {
  const { icon, className } = props;
  const style = useStyles(
    [
      wrapperStyle,
      (arrify(className).length !== 0 && className) || "",
    ],
    props
  );

  if (ReactIs.isValidElementType(icon)) {
    const IconElementType = icon as IconType;
    return (
      <div className={style}>
        <IconElementType />
      </div>
    );
  }

  const IconElement = icon as JSX.Element;

  return (
    <div className={cx(style)}>{React.cloneElement(IconElement)}</div>
  );
}

export default React.memo(Icon);
