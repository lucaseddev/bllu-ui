import { styled } from "hooks/useStyles";
import React from "react";

export interface SidebarProps {
  children: React.ReactNode;

  open?: boolean;

  width?: number;
}

export const SidebarStyle = styled<Omit<SidebarProps, "children">>(
  ({ theme, open = true, width = 200 }) => ({
    transition: `transform 0.2s ease-in-out`,
    transform: `translateX(${open ? "0px" : `-${width}px`})`,

    width: width,
    height: "100%",
  })
);

const WrapperStyle = styled<Omit<SidebarProps, "children">>(
  ({ open = true, width = 200 }) => ({
    transition: `width 0.2s ease-in-out`,
    width: open ? width : "0px",
  })
);

export function Sidebar(props: SidebarProps) {
  const { children, open, width } = props;

  return (
    <div className={`${WrapperStyle({ open, width })}`}>
      <div className={`${SidebarStyle({ open, width })}`}>
        {children}
      </div>
    </div>
  );
}
