import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      onPrimary: string;

      secondary: string;
      onSecondary: string;

      background: string;
      onBackground: string;

      onSurface: string;
      surface: string;
      surfaceStroke: string;

      error: string;
      onError: string;
      underError: string;

      onSuccess: string;
      success: string;
      underSuccess: string;
    };
  }
}
