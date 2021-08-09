import { CSSObject } from "cxs";
import { Theme } from "types/theme";

export type StyleFunction = ({
  theme,
  prev,
}: {
  theme: Theme;
  prev: CSSObject;
}) => CSSObject;

export const combine = (theme: Theme, styles: StyleFunction[]) => {
  let CSS: CSSObject = {};
  styles.forEach((styleFunc) => {
    CSS = { ...CSS, ...styleFunc({ theme, prev: CSS }) };
  });

  return CSS;
};
