export const XS = "xs";
export const SM = "sm";
export const MD = "md";
export const LG = "lg";
export const XL = "xl";
export const XL2 = "2xl";
export const XL3 = "4xl";

export type XS = typeof XS;
export type SM = typeof SM;
export type MD = typeof MD;
export type LG = typeof LG;
export type XL = typeof XL;
export type XL2 = typeof XL2;
export type XL3 = typeof XL3;

export const res = {
  [SM]: "640px",
  [MD]: "768px",
  [LG]: "1024px",
  [XL]: "1280px",
  [XL2]: "1536px",
  [XL3]: "1920px",
};

export const resCSS = {
  [SM]: `@media (min-width: ${res[SM]})`,
  [MD]: `@media (min-width: ${res[MD]})`,
  [LG]: `@media (min-width: ${res[LG]})`,
  [XL]: `@media (min-width: ${res[XL]})`,
  [XL2]: `@media (min-width: ${res[XL2]})`,
  [XL3]: `@media (min-width: ${res[XL3]})`,
};
