import Icon from "components/icon/Icon";
import { StyleFunction, useStyles } from "hooks/useStyles";
import React from "react";
import { IconType } from "react-icons";
import { Button, ButtonAppearance, ButtonSize } from "./Button";

export interface IconButtonProps {
  icon: IconType | JSX.Element;
  danger?: boolean;
  submit?: boolean;

  appearance: ButtonAppearance;
  size: ButtonSize;

  onClick?: () => void;
  className: string | CSSRule | StyleFunction;
}

export const IconButton = React.memo(
  React.forwardRef(function IconButton(
    props: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) {
    const { icon, ...rest } = props;

    return (
      <Button {...rest} ref={ref}>
        <Icon icon={icon} />
      </Button>
    );
  })
);
