export type Theme = ThemeColors & ThemeAnimations;

export interface ThemeColors {
  colors: {
    default: string;
    onDefault: string;
    defaultStroke: string;
    hoverDefault: string;
    activeDefault: string;

    primary: string;
    onPrimary: string;
    hoverPrimary: string;
    activePrimary: string;

    secondary: string;
    onSecondary: string;

    background: string;
    onBackground: string;

    onSurface: string;
    surface: string;
    surfaceStroke: string;

    danger: string;
    onDanger: string;
    underDanger: string;
    hoverDanger: string;
    activeDanger: string;

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
