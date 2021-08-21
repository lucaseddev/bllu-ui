import React, { useEffect, useMemo, useRef, useState } from "react";
import { Theme } from "types/theme";
import { useTheme } from "./useTheme";

import cx from "classnames";
import { isFunction, isObject } from "helpers/validations";
import { css, Rule } from "glamor";
import isEqual from "react-fast-compare";

// type Modify<T, R> = Omit<T, keyof R> & R;

interface StyleInterface {
  [key: string]:
    | StyleInterface
    | React.CSSProperties
    | string
    | number;
}

export type StyleObject = StyleInterface & React.CSSProperties;

export interface StyleProps {
  theme: Theme;
}

export type StyleFunction<T = {}> = (
  props: T & StyleProps
) => StyleObject;

export interface StyleParams<T> {
  styles: (StyleObject | StyleFunction<T>)[];
  props?: T;
}

export function useStyles<T = {}>(
  styles: (StyleObject | StyleFunction<T> | string)[],
  props?: T
): string {
  const deps =
    (props && Object.keys(props).map((key: string) => props[key])) ||
    [];

  const [prevDeps, setPrevDeps] = useState<any>(deps);
  const { theme } = useTheme();

  useEffect(() => {
    if (!isEqual(prevDeps, deps)) {
      setPrevDeps(deps);
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
        return css(style as StyleObject);
      }

      // Assumes its a string
      return style;
    });

    return cx(result);
  };

  return useMemo(computeStyles, prevDeps);
}
