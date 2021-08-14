import { useMemo } from "react";
import { Theme } from "types/theme";
import { useTheme } from "./useTheme";

import cx from "classnames";
import { isFunction } from "helpers/validations";
import { css, Rule } from "glamor";

export type CSSRule = Rule & React.CSSProperties;

export interface StyleProps {
  theme: Theme;
}

export type StyleFunction<T = {}> = (
  props: T & StyleProps
) => CSSRule;

export interface StyleParams<T> {
  styles: (CSSRule | StyleFunction<T>)[];
  props?: T;
}

export function useStyles<T = {}>(
  styles: (CSSRule | StyleFunction<T>)[],
  props?: T
): string {
  const { theme } = useTheme();

  const deps =
    (props && Object.keys(props).map((key: string) => props[key])) ||
    [];

  const computeStyles = () => {
    const result = styles.map((style) => {
      if (isFunction(style))
        return css(
          (style as StyleFunction<T>)({
            ...(props || ({} as T)),
            theme,
          })
        );
      else return css(style as CSSRule);
    });

    return cx(result);
  };

  return useMemo(computeStyles, deps);
}
