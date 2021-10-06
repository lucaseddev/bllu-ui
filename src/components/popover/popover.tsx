import { VirtualElement } from "@popperjs/core";
import { Position } from "../../constants";
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { styled } from "hooks";
import { pxStep, StepSize } from "helpers/scale";
import { Portal } from "components/portal";

import { isElement } from "react-is";
import { Overlay } from "components/overlay";
import isFunction from "is-function";

export interface PopoverProps {
  children: React.ReactElement;

  trigger?: "click" | "hover";

  placement?: Position;

  content: React.ReactNode | ((close: Function) => React.ReactNode);
}

interface PopoverStyleProps {
  show: boolean;
}

const PopoverStyle = styled<PopoverStyleProps>(({ theme, show }) => ({
  display: show ? "block" : "none",
  backgroundColor: theme.colors.default,
  border: `1px solid ${theme.colors.surfaceStroke}`,
  borderRadius: pxStep(1, StepSize.PX4),

  padding: `${pxStep(1, StepSize.PX4)} 0px`,

  zIndex: 999,

  boxShadow: `  0px 0px 16px rgba(0, 0, 0, 0.08)`,

  "& > div[data-arrow]": {
    "&, & > span": {
      position: "absolute",
      width: pxStep(4, StepSize.PX4),
      height: pxStep(4, StepSize.PX4),
    },

    "& > span": {
      visibility: "visible",
    },

    visibility: "hidden",
  },

  "&[data-popper-placement^='top'] > div[data-arrow]": {
    bottom: `-${pxStep(4, StepSize.PX4)}`,
    "& > span": {
      borderTop: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderLeft: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderRight: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='bottom'] > div[data-arrow]": {
    top: `-${pxStep(4, StepSize.PX4)}`,
    "& > span": {
      borderBottom: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderLeft: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderRight: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='left'] > div[data-arrow]": {
    right: `-${pxStep(4, StepSize.PX4)}`,
    "& > span": {
      borderLeft: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderTop: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderBottom: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='right'] > div[data-arrow]": {
    left: `-${pxStep(4, StepSize.PX4)}`,
    "& > span": {
      borderRight: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderTop: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderBottom: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },
}));

export const Popover = React.memo(function Popover(
  props: PopoverProps
) {
  const {
    trigger = "click",
    children,
    placement = Position.BOTTOM,
    content,
  } = props;

  if (!isElement(children)) {
    console.warn(
      "Popover children can only contain react HTML elements!"
    );
    throw new Error(
      "Popover children can only contain react HTML elements!"
    );
  }

  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(
    null
  );
  const [childRef, setChildRef] = useState<HTMLElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(
    null
  );
  const [show, setShow] = useState(false);

  const { styles, attributes, update } = usePopper(
    childRef,
    popperRef,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowRef } },
        { name: "offset", options: { offset: [0, 16] } },
      ],
      placement: placement,
    }
  );

  const handleTrigger = (value: boolean) => {
    setShow(value);
    if (update) update();
  };

  const isLeft = placement.includes("left");
  const isRight = placement.includes("right");
  const isTop = placement.includes("top");
  const isBottom = placement.includes("bottom");

  const isHorizontal = isLeft || isRight;
  const isVertical = isTop || isBottom;

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        ref: setChildRef,
        onClick: () => {
          if (trigger === "click") {
            handleTrigger(true);
          }
        },

        onMouseEnter: () =>
          trigger === "hover" && handleTrigger(true),
        onMouseLeave: () => trigger === "hover" && setShow(false),
      })}

      <Portal>
        <Overlay
          onClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
          show={trigger === "click" && show && true}
        />
        <div
          className={`${PopoverStyle({ show })}`}
          ref={setPopperRef}
          style={styles.popper}
          {...attributes.popper}
          onMouseEnter={() => trigger === "hover" && setShow(true)}
          onMouseLeave={() => {
            trigger === "hover" && setShow(false);
          }}
        >
          {trigger === "hover" && (
            <div
              onMouseEnter={() => setShow(true)}
              style={{
                position: "absolute",
                width: `calc(100% + ${(isHorizontal && 16) || 0}px)`,
                height: `calc(100% + ${(isVertical && 16) || 0}px)`,
                top: (isTop && "4px") || "auto",
                left: (isLeft && "4px") || "auto",
                right: (isRight && "4px") || "auto",
                bottom: (isBottom && "4px") || "auto",
                zIndex: -1,
              }}
            />
          )}
          {(isFunction(content) &&
            (content as (close: Function) => React.ReactNode)(() =>
              setShow(false)
            )) ||
            content}
          <div ref={setArrowRef} style={styles.arrow} data-arrow>
            <span />
          </div>
        </div>
      </Portal>
    </React.Fragment>
  );
});
