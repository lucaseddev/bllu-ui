export enum StepSize {
  PX2 = 2,
  PX4 = 4,
  PX8 = 8,
  REM125 = 0.125,
  REM25 = 0.25,
  REM5 = 0.5,
}

export function remStep(x: number, size: StepSize = StepSize.REM5) {
  if (!Number.isInteger(x)) {
    throw new TypeError("x is not a number.");
  }

  return x * size + "rem";
}

export function pxStep(x: number, size: StepSize = StepSize.PX8) {
  if (!Number.isInteger(x)) {
    throw new TypeError("x is not a number.");
  }

  return x * size + "px";
}
