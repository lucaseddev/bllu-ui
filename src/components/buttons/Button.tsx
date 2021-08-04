import React from "react";
import styled, { css } from "styled-components";
import { cssStep } from "../../helpers/cssScale";

import classnames from "classnames";
import { MinorSizes } from "../../types/sizes";

export interface ButtonProps {
  text: string;

  submit: boolean;

  // Appearance
  primary: boolean;
  secondary: boolean;
  link: boolean;

  // States
  disabled: boolean;
  isLoading: boolean;

  // Sizes
  size: MinorSizes;
}

const BtnStyle = {
  padding: {
    sm: `${cssStep(1)} ${cssStep(2)}`,
    md: `${cssStep(1)} ${cssStep(3)}`,
    lg: `${cssStep(1)} ${cssStep(4)}`,
  },
};

const Wrapper = styled.button`
  padding: ${cssStep(1)} ${cssStep(2)};
`;

export function Button(props: ButtonProps) {
  const { text, submit, size, isLoading, disabled, ...rest } = props;

  return (
    <Wrapper
      type={(submit && "submit") || "button"}
      className={classnames({
        ...rest,
      })}
    >
      {text}
    </Wrapper>
  );
}
