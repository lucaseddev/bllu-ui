import { styled } from "hooks/useStyles";
import React from "react";

export const LayoutStyle = styled({
  display: "flex",
  padding: 0,
  margin: 0,

  minHeight: "100vh",
  height: "100vh",
  overflow: "hidden",
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
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div className={`${LayoutStyle} ${ChildLayout}`}>{children}</div>
  );
}
