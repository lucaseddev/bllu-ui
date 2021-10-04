import { styled } from "hooks/useStyles";
import React from "react";

export interface ContentProps {
  children: React.ReactNode;

  bg?: string;
}

interface ContentInternalProps
  extends Omit<ContentProps, "children"> {}

const ContentStyle = styled<ContentInternalProps>(
  ({ theme, bg }) => ({
    flex: 1,
    position: "relative",

    backgroundColor: bg || theme.colors.surface,
  })
);

export function Content(props: ContentProps) {
  const { children, bg } = props;

  return <div className={`${ContentStyle({ bg })}`}>{children}</div>;
}
