import { ThemeContext } from "contexts/ThemeProvider";
import { useContext, useEffect } from "react";
import { Theme } from "types/theme";

export const useTheme = (defaultTheme?: Theme) => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    defaultTheme && setTheme(defaultTheme);
  }, [defaultTheme]);

  return { theme, setTheme };
};
