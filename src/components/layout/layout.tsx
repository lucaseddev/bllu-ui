import { SidebarProvider } from "contexts/SidebarProvider";
import { useSidebar } from "hooks/useSidebar";
import { styled } from "hooks/useStyles";
import React from "react";

export const LayoutStyle = styled({
  display: "flex",
  padding: 0,
  margin: 0,

  minHeight: "100vh",
  height: "100vh",
  overflow: "hidden",

  position: "relative",
});

export const ChildLayout = styled({
  [`.${LayoutStyle} &`]: {
    minHeight: "auto",
    flexDirection: "column",
    flex: 1,

    overflowY: "auto",
  },
});

export interface LayoutProps {
  children: React.ReactNode;

  root?: boolean;

  defaultSidebarOpen?: boolean;
}

export const Layout = React.memo(function Layout(props: LayoutProps) {
  const { root, children, defaultSidebarOpen } = props;

  const element = (
    <div className={`${LayoutStyle} ${ChildLayout}`}>{children}</div>
  );

  return (
    (root && (
      <SidebarProvider isOpen={defaultSidebarOpen}>
        {element}
      </SidebarProvider>
    )) ||
    element
  );
});
