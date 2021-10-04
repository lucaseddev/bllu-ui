import { useSidebar } from "hooks/useSidebar";
import { styled } from "hooks/useStyles";
import React, { useState } from "react";
import { resCSS, SM } from "types/sizes";

export interface SidebarProps {
  children: React.ReactNode;

  width?: number;
}

interface SidebarInternalProps
  extends Omit<SidebarProps, "children"> {
  isOpen?: boolean;
}

export const SidebarStyle = styled<SidebarInternalProps>(
  ({ theme, isOpen = true, width = 200 }) => ({
    transition: `transform 0.2s ease-in-out`,
    transform: `translateX(${isOpen ? "0px" : `-${width}px`})`,

    width: width,

    position: "fixed",
    minHeight: "100%",

    boxShadow: isOpen
      ? `
      1px 0px 1.9px rgba(0, 0, 0, 0.008),
      2.3px 0px 4.4px rgba(0, 0, 0, 0.011),
      4.1px 0px 7.9px rgba(0, 0, 0, 0.014),
      6.7px 0px 13.2px rgba(0, 0, 0, 0.016),
      11.1px 0px 21.7px rgba(0, 0, 0, 0.019),
      19.4px 0px 37.9px rgba(0, 0, 0, 0.022),
      42px 0px 82px rgba(0, 0, 0, 0.03)
`
      : "none",

    [resCSS["sm"]]: {
      position: "static",
      boxShadow: "none",
    },

    zIndex: 9999,

    background: "#fff",
  })
);

const WrapperStyle = styled<SidebarInternalProps>(
  ({ isOpen = true, width = 200 }) => ({
    minHeight: "100vh",

    width: 0,

    [resCSS["sm"]]: {
      transition: `width 0.2s ease-in-out`,
      width: isOpen ? width : "0px",
    },
  })
);

const overlayStyle = styled<SidebarInternalProps>(
  ({ theme, isOpen }) => ({
    display: isOpen ? "display" : "none",
    position: "absolute",
    inset: 0,

    width: "100%",
    height: "100%",

    zIndex: 9998,

    background: theme.colors.overlayColor,

    [resCSS["sm"]]: {
      display: "none",
    },
  })
);

export function Sidebar(props: SidebarProps) {
  const { children, width } = props;

  const { isOpen, trigger } = useSidebar();

  return (
    <div className={`${WrapperStyle({ isOpen, width })}`}>
      <div
        className={`${overlayStyle({ isOpen })}`}
        onClick={(e) => {
          e.stopPropagation();
          trigger(false);
        }}
      ></div>
      <div className={`${SidebarStyle({ isOpen, width })}`}>
        {children}
      </div>
    </div>
  );
}
