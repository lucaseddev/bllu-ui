import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Theme } from "types/theme";
import { useTheme } from "./useTheme";

import cx from "classnames";
import { isFunction, isObject } from "helpers/validations";
import { css, Rule, StyleAttribute } from "glamor";
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

function computeStyles<T>(
  styles: (StyleObject | StyleFunction<T> | string)[],
  theme: Theme,
  props: T
) {
  return styles.map((style) => {
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
}

export function useStyles<T = {}>(
  styles: (StyleObject | StyleFunction<T> | string)[],
  props?: T
): string {
  const deps =
    (props && Object.keys(props).map((key: string) => props[key])) ||
    [];

  // const [prevDeps, setPrevDeps] = useState<any>(deps);
  const depsRef = useRef<any[]>();
  const styleRef = useRef<any>();
  const { theme } = useTheme();

  return useMemo(() => {
    if (!isEqual(depsRef.current, deps)) {
      console.log("Computing style");

      depsRef.current = deps;
      styleRef.current = cx(computeStyles(styles, theme, props));
    }

    return styleRef.current;
  }, [deps]);
}

export function styled<T = {}>(
  style: StyleFunction<T>
): (props?: T) => StyleAttribute;
export function styled(style: StyleObject): StyleAttribute;
export function styled<T = {}>(style: any) {
  if (isFunction(style)) {
    return (props?: T) => {
      const depsRef = useRef<any[]>();
      const styleRef = useRef<any>();
      const { theme } = useTheme();
      const deps =
        (props &&
          Object.keys(props).map((key: string) => props[key])) ||
        [];

      return useMemo(() => {
        if (!isEqual(depsRef.current, deps)) {
          console.log("Computing style");

          depsRef.current = deps;
          styleRef.current = css(
            (style as StyleFunction<T>)({
              ...(props || ({} as T)),
              theme,
            })
          );
        }

        return styleRef.current;
      }, [deps]);
    };
  }

  if (!isObject(style)) {
    console.warn("Style type not supported.");
    throw new Error("Style type not supported.");
  }

  return css(style as StyleObject);
}
