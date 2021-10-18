import cx from "classnames";
import { Overlay } from "components/overlay";
import { Portal } from "components/portal";
import { Position } from "../../constants";
import { styled } from "hooks";
import React, { useEffect, useState } from "react";
import isFunction from "is-function";

export type ModalChildFunction = (props: {
  close: () => void;
}) => React.ReactNode;

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | ModalChildFunction;

  open: boolean;
  onClose: () => void;

  placement?: Position;
}

const ModalWrapperStyle = styled({
  position: "fixed",
  inset: 0,

  display: "flex",
  zIndex: 10,
  justifyContent: "center",
  alignItems: "center",

  "&[data-placement^='top']": {
    alignItems: "flex-start",
  },

  "&[data-placement^='bottom']": {
    alignItems: "flex-end",
  },

  "&[data-placement^='left'], &[data-placement$='start']": {
    justifyContent: "flex-start",
  },

  "&[data-placement^='right'], &[data-placement$='end']": {
    justifyContent: "flex-end",
  },
});

const ModalStyle = styled({
  zIndex: 999,

  boxShadow: `
  0px 2.8px 2.2px rgba(0, 0, 0, 0.011),
  0px 6.7px 5.3px rgba(0, 0, 0, 0.016),
  0px 12.5px 10px rgba(0, 0, 0, 0.02),
  0px 22.3px 17.9px rgba(0, 0, 0, 0.024),
  0px 41.8px 33.4px rgba(0, 0, 0, 0.029),
  0px 100px 80px rgba(0, 0, 0, 0.04)
  `,
});

const OverlayStyle = styled(({ theme }) => ({
  background: theme.colors.overlayColor,
}));

export const Modal = React.memo(function (props: ModalProps) {
  const {
    open = false,
    onClose,
    placement = "center",
    children,
    tabIndex,
    ...rest
  } = props;

  const [
    previousFocus,
    setPreviousFocus,
  ] = useState<HTMLElement | null>(null);
  const [
    containerRef,
    setContainerRef,
  ] = useState<HTMLDivElement | null>(null);

  const handleClose = () => {
    onClose();
    previousFocus?.focus();
  };

  useEffect(() => {
    if (containerRef) {
      console.log("Storing previous focus");
      setPreviousFocus(document.activeElement as HTMLElement);
      containerRef.focus();
    }
  }, [containerRef]);

  const overlayStyle = OverlayStyle();

  return (
    <Portal>
      {(open && (
        <div
          data-placement={placement || "center"}
          className={cx(ModalWrapperStyle)}
        >
          <Overlay
            className={overlayStyle}
            show={open}
            onClick={handleClose}
          />
          <div
            ref={setContainerRef}
            tabIndex={tabIndex ?? -1}
            className={cx(ModalStyle)}
            {...rest}
          >
            {(isFunction(children) &&
              (children as ModalChildFunction)({
                close: handleClose,
              })) ||
              children}
          </div>
        </div>
      )) ||
        null}
    </Portal>
  );
});
