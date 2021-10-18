import { StyleObject, useStyles } from "hooks/useStyles";
import React from "react";
import { IconType } from "react-icons";
import cx from "classnames";
import arrify from "arrify";

import * as ReactIs from "react-is";

import { styled } from "hooks";
import classNames from "classnames";

export interface IconProps {
  size?: number;
  icon: IconType | JSX.Element;
  color?: string;
  className?: StyleObject | string;
}

export const IconStyle = styled<IconProps>(({ size, color }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: size || 16,
  color: color || "",
}));

export const Icon = React.memo(function (props: IconProps) {
  const { icon, className } = props;

  const style = useStyles(
    [(arrify(className).length !== 0 && className) || ""],
    props
  );

  if (ReactIs.isValidElementType(icon)) {
    const IconElementType = icon as IconType;
    return (
      <div className={classNames(IconStyle(props), style)}>
        <IconElementType />
      </div>
    );
  }

  const IconElement = icon as JSX.Element;

  return (
    <div className={cx(style)}>{React.cloneElement(IconElement)}</div>
  );
});
