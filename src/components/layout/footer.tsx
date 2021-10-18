import React from "react";

export interface FooterProps {
  children: React.ReactNode;
}

export function Footer(props: FooterProps) {
  const { children } = props;

  return <div>{children}</div>;
}
