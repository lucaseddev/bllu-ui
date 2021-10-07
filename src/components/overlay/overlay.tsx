import { styled } from "hooks";
import React from "react";

export interface OverlayProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  show: boolean;
}

const overlayStyle = styled({
  position: "fixed",
  inset: 0,
  zIndex: 998,
});

export function Overlay(props: OverlayProps) {
  return (
    (props.show && (
      <div className={`${overlayStyle}`} onClick={props.onClick} />
    )) ||
    null
  );
}
