import { styled, StyleObject } from "hooks";
import React from "react";

export interface OverlayProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  show: boolean;

  className?: StyleObject | string;
}

const overlayStyle = styled({
  position: "fixed",
  inset: 0,
  zIndex: 998,
});

export function Overlay(props: OverlayProps) {
  const { className } = props;
  return (
    (props.show && (
      <div
        className={`${overlayStyle} ${className}`}
        onClick={props.onClick}
      />
    )) ||
    null
  );
}
