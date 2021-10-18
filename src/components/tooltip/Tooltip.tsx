import React from "react";
import { Popover, PopoverProps } from "components/popover";
import { styled } from "hooks";
import cx from "classnames";
import { pxStep, remStep, StepSize } from "helpers/scale";
import { isElement } from "react-is";

export interface TooltipProps extends Omit<PopoverProps, "trigger"> {
  mw: number;
}

type TooltipStyleProps = Omit<TooltipProps, "children" | "content">;

const TooltipStyled = styled({
  padding: pxStep(3, StepSize.PX4),

  fontSize: remStep(6, StepSize.REM125),

  borderRadius: pxStep(1, StepSize.PX4),
});

const backgroundColor = (theme: any) => `${theme.colors.onDefault}db`;

const TooltipThemed = styled<TooltipStyleProps>(
  ({ theme, mw: maxWidth }) => ({
    maxWidth: !maxWidth ? "none" : `${maxWidth}ch`,
    backgroundColor: backgroundColor(theme),
    color: theme.colors.surface,
  })
);

const PopoverStyle = styled(({ theme }) => ({
  "&[data-popper-placement^='top'] > div[data-arrow] > span": {
    borderTopColor: `${backgroundColor(theme)} !important`,
  },

  "&[data-popper-placement^='bottom'] > div[data-arrow] > span": {
    borderBottomColor: `${backgroundColor(theme)} !important`,
  },

  "&[data-popper-placement^='left'] > div[data-arrow] > span": {
    borderLeftColor: `${backgroundColor(theme)} !important`,
  },

  "&[data-popper-placement^='right'] > div[data-arrow] > span": {
    borderRightColor: `${backgroundColor(theme)} !important`,
  },

  boxShadow: `
  0px 0.3px 0.9px rgba(0, 0, 0, 0.035),
  0px 2px 7px rgba(0, 0, 0, 0.07) !important`,

  border: `none !important`,
  borderRadius: `calc(${pxStep(1, StepSize.PX4)} + 2px) !important`,
}));

export const Tooltip = React.memo(function (props: TooltipProps) {
  const { children, content, mw, ...rest } = props;

  const contentStyle = TooltipThemed({ mw });

  return (
    <Popover
      {...rest}
      className={cx(PopoverStyle())}
      content={
        <div className={cx(TooltipStyled, contentStyle)}>
          {content}
        </div>
      }
      trigger="hover"
    >
      {(isElement(children) && children) || <span>{children}</span>}
    </Popover>
  );
});
