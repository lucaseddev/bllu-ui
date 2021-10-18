import { ThemeProvider } from "../src/contexts";
import { themeLight } from "../src/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  function withThemeProvider(Story, context) {
    return (
      <ThemeProvider theme={themeLight}>
        <Story {...context} />
      </ThemeProvider>
    );
  },
];
