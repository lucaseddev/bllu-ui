import { css, keyframes, Rule } from "glamor";
import { pxStep, StepSize } from "helpers/scale";
import { useStyles } from "hooks/useStyles";
import React from "react";
// import styled from "styled-components";

// export const Spinner = styled(SpinnerComponent)`
//   .lds-ring {
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//   }
//   .lds-ring div {
//     box-sizing: border-box;
//     display: block;
//     position: absolute;
//     width: 64px;
//     height: 64px;
//     margin: 8px;
//     border: 8px solid #fff;
//     border-radius: 50%;
//     animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//     border-color: #fff transparent transparent transparent;
//   }
//   .lds-ring div:nth-child(1) {
//     animation-delay: -0.45s;
//   }
//   .lds-ring div:nth-child(2) {
//     animation-delay: -0.3s;
//   }
//   .lds-ring div:nth-child(3) {
//     animation-delay: -0.15s;
//   }
//   @keyframes lds-ring {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

const ldsRing = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

const style: Rule = {
  display: "inline-block",
  position: "relative",
  width: pxStep(2),
  height: pxStep(2),

  "& div": {
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: pxStep(4, StepSize.PX4),
    height: pxStep(4, StepSize.PX4),
    border: "2px solid #fff",
    borderRadius: "100%",
    animation: `${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: "#fff transparent transparent transparent",
  },

  "& div:nth-child(1)": {
    animationDelay: "-0.45s",
  },

  "& div:nth-child(2)": {
    animationDelay: "-0.3s",
  },

  "& div:nth-child(3)": {
    animationDelay: "-0.15s",
  },
};

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
}

export function Spinner(props: SpinnerProps) {
  const { size } = props;

  const styles = useStyles(
    () => ({
      styles: [style],
      props: { size },
    }),
    [size]
  );

  return (
    <div className={styles}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
