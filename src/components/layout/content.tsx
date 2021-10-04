import { styled } from "hooks/useStyles";
import React from "react";

export interface ContentProps {
  children: React.ReactNode;
}

interface ContentInternalProps
  extends Omit<ContentProps, "children"> {}

const ContentStyle = styled<ContentInternalProps>(({ theme }) => ({
  flex: 1,

  backgroundColor: theme.colors.surface,
}));

export function Content(props: ContentProps) {
  const { children } = props;

  return <div className={`${ContentStyle()}`}>{children}</div>;
}
