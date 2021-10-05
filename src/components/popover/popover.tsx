import { VirtualElement } from "@popperjs/core";
import { Position } from "../../constants";
import React, { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { styled } from "hooks";
import { pxStep, StepSize } from "helpers/scale";
import { Portal } from "components/portal";

import { isElement } from "react-is";

export interface PopoverProps {
  children: React.ReactElement;

  trigger?: "click" | "hover";

  placement?: Position;

  content: React.ReactNode;
}

const PopoverStyle = styled(({ theme }) => ({
  backgroundColor: theme.colors.default,
  border: `1px solid ${theme.colors.surfaceStroke}`,
  borderRadius: pxStep(1, StepSize.PX4),

  padding: `${pxStep(1, StepSize.PX4)} 0px`,

  zIndex: 999,

  boxShadow: `  0px 0px 16px rgba(0, 0, 0, 0.08)`,

  "& > div[data-arrow]": {
    "&, & > span": {
      position: "absolute",
      width: pxStep(2, StepSize.PX4),
      height: pxStep(2, StepSize.PX4),
    },

    "& > span": {
      visibility: "visible",
    },

    visibility: "hidden",
  },

  "&[data-popper-placement^='top'] > div[data-arrow]": {
    bottom: `-${pxStep(2, StepSize.PX4)}`,
    "& > span": {
      borderTop: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderLeft: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderRight: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='bottom'] > div[data-arrow]": {
    top: `-${pxStep(2, StepSize.PX4)}`,
    "& > span": {
      borderBottom: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderLeft: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderRight: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='left'] > div[data-arrow]": {
    right: `-${pxStep(2, StepSize.PX4)}`,
    "& > span": {
      borderLeft: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderTop: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderBottom: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },

  "&[data-popper-placement^='right'] > div[data-arrow]": {
    left: `-${pxStep(2, StepSize.PX4)}`,
    "& > span": {
      borderRight: `${pxStep(2, StepSize.PX4)} solid ${
        theme.colors.default
      }`,
      borderTop: `${pxStep(2, StepSize.PX4)} solid transparent`,
      borderBottom: `${pxStep(2, StepSize.PX4)} solid transparent`,
    },
  },
}));

export function Popover(props: PopoverProps) {
  const {
    trigger,
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
  const [childRef, setChildRef] = useState(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(childRef, popperRef, {
    modifiers: [
      { name: "arrow", options: { element: arrowRef } },
      { name: "offset", options: { offset: [0, 16] } },
    ],
    placement: placement,
  });

  const popperStyle = PopoverStyle();

  return (
    <React.Fragment>
      {React.cloneElement(children, { ref: setChildRef })}

      <Portal>
        <div
          className={`${popperStyle}`}
          ref={setPopperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <div ref={setArrowRef} style={styles.arrow} data-arrow>
            <span />
          </div>
        </div>
      </Portal>
    </React.Fragment>
  );
}
