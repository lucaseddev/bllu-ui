import { useEffect, useMemo, useRef } from "react";
import { Theme } from "types/theme";
import { useTheme } from "./useTheme";

import cx from "classnames";
import { isFunction, isObject } from "helpers/validations";
import { css, Rule } from "glamor";
import isEqual from "react-fast-compare";

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
  styles: (CSSRule | StyleFunction<T> | string)[],
  props?: T
): string {
  const deps =
    (props && Object.keys(props).map((key: string) => props[key])) ||
    [];

  const prevDeps = useRef<any[]>(deps);
  const { theme } = useTheme();

  useEffect(() => {
    if (!isEqual(prevDeps.current, deps)) {
      prevDeps.current = deps;
    }
  }, [deps]);

  const computeStyles = () => {
    console.log("Computing style");
    const result = styles.map((style) => {
      if (isFunction(style))
        return css(
          (style as StyleFunction<T>)({
            ...(props || ({} as T)),
            theme,
          })
        );
      else if (isObject(style)) {
        return css(style as CSSRule);
      }

      // Assumes its a string
      return style;
    });

    return cx(result);
  };

  return useMemo(computeStyles, prevDeps.current);
}
