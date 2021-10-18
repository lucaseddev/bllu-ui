import React, { useCallback, useState } from "react";
import { themeAnimations } from "theme";
import { Theme, ThemeColors } from "types/theme";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> = React.createContext<any>(
  null
);

interface ThemeProviderProps {
  theme: ThemeColors;
  children: any;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>({
    ...themeAnimations,
    ...props.theme,
  });

  const changeTheme = useCallback((theme: ThemeColors) => {
    setTheme({
      ...themeAnimations,
      ...theme,
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: changeTheme,
        theme: theme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
