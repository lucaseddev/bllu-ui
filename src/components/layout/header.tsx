import { styled } from "hooks/useStyles";
import React, { useState } from "react";

export interface HeaderProps {
  children: React.ReactNode;

  fixed?: boolean;

  height?: number;
}

interface HeaderInternalProps extends Omit<HeaderProps, "children"> {
  sticky?: boolean;
}

const WrapperStyle = styled<HeaderInternalProps>(
  ({ height = "auto" }) => ({
    height: height,
  })
);

const HeaderStyle = styled<HeaderInternalProps>(
  ({ fixed = false, sticky }) => ({
    position: fixed && sticky ? "fixed" : "static",
  })
);

export function Header(props: HeaderProps) {
  const { children, fixed } = props;

  const [sticky, setSticky] = useState(false);

  return (
    <div className={`${WrapperStyle({ fixed })}`}>
      <div className={`${HeaderStyle({ fixed, sticky })}`}>
        {children}
      </div>
    </div>
  );
}
