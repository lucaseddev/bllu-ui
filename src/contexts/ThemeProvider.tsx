import React, { useCallback, useState } from "react";
import { LightTheme } from "theme";
import { Theme } from "types/theme";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext: React.Context<ThemeContextProps> = React.createContext<any>(
  null
);

interface ThemeProviderProps {
  theme: Theme;
  children: any;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(props.theme);

  const changeTheme = useCallback((theme: Theme) => {
    setTheme(theme);
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
