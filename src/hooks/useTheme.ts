import { ThemeContext } from "contexts/ThemeProvider";
import { useContext } from "react";

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return { theme, setTheme };
};
