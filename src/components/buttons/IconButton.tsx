import Icon from "components/icon/Icon";
import { Spinner } from "components/spinner";
import { css } from "glamor";
import { pxStep, StepSize } from "helpers/scale";
import { StyleFunction, useStyles } from "hooks/useStyles";
import React from "react";
import { IconType } from "react-icons";
import { Button, ButtonAppearance, ButtonSize } from "./Button";

export interface IconButtonProps {
  icon: IconType | JSX.Element;
  danger?: boolean;
  submit?: boolean;

  appearance?: ButtonAppearance;
  size?: ButtonSize;

  isLoading?: boolean;
  disabled?: boolean;

  onClick?: () => void;
  className?: string | CSSRule | StyleFunction;
}

export const IconButton = React.memo(
  React.forwardRef(function IconButton(
    props: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) {
    const { icon, size = "md", isLoading, disabled, ...rest } = props;

    let iconSize = 16;

    if (size === "md") {
      iconSize = 18;
    } else if (size === "lg") {
      iconSize = 20;
    }

    return (
      <Button
        disabled={isLoading || disabled}
        size={size}
        {...rest}
        ref={ref}
      >
        {(isLoading && <Spinner size={size} />) || (
          <Icon size={iconSize} icon={icon} />
        )}
      </Button>
    );
  })
);
