export enum StepSize {
  MINOR_PX = 4,
  MAJOR_PX = 8,
  MINOR_REM = 0.25,
  MAJOR_REM = 0.5,
}

export function cssStep(
  x: number,
  size: StepSize = StepSize.MAJOR_REM
) {
  if (!Number.isInteger(x)) {
    throw new TypeError("x is not a number.");
  }

  return x * size + ((size % 1 === 0 && "px") || "rem");
}
