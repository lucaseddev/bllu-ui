export type Theme = ThemeColors & ThemeAnimations;

export interface ThemeColors {
  colors: {
    default: string;
    onDefault: string;
    defaultStroke: string;

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

export interface ThemeAnimations {
  easings: {
    inOutCubic: string;
  };
}
