import { DefaultTheme } from "@react-navigation/native";

const Colors = {
  primary: {
    "50": "#fef2f3",
    "100": "#fde6e7",
    "200": "#fbd0d5",
    "300": "#f7aab2",
    "400": "#f27a8a",
    "500": "#ea546c",
    "600": "#d5294d",
    "700": "#b31d3f",
    "800": "#961b3c",
    "900": "#811a39",
    "950": "#48091a",
  },
  gray: {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917",
    "950": "#0c0a09",
  },
  error: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
    "950": "#450a0a",
  },
  white: "#ffffff",
};

export const Fonts = {
  default: "source-sans",
  bold: "source-sans-bold",
};

export const Variables = {
  colors: {
    ...Colors,
    text: Colors.primary["950"],
    lightText: Colors.gray["400"],
    headerText: Colors.primary["50"],
    ripple: "rgba(0, 0, 0, 0.1)",
  },
  textSizes: {
    xxxl: 28,
    xxl: 24,
    xl: 23,
    lg: 20,
    md: 18,
    default: 16,
    sm: 14,
  },
  sizes: {
    "5xl": 80,
    "4xl": 64,
    "3xl": 48,
    "2xl": 32,
    xl: 24,
    lg: 20,
    md: 16,
    sm: 12,
    xs: 8,
    "2xs": 4,
    horizontalPadding: 16,
  },
  fonts: {
    ...Fonts,
  },
};

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Variables.colors.primary["500"],
    background: Variables.colors.primary["50"],
    card: Variables.colors.primary["700"],
    tint: Variables.colors.primary["500"],
    icon: Variables.colors.primary["500"],
  },
};

export const DefaultScreenOptions = {
  tabBarStyle: {
    backgroundColor: Variables.colors.white,
  },
  headerTitleStyle: {
    fontFamily: Fonts.bold,
  },
  headerRightContainerStyle: {
    paddingRight: Variables.sizes.horizontalPadding,
  },
  tabBarLabelStyle: {
    fontFamily: Variables.fonts.bold,
    fontSize: Variables.textSizes.sm,
  },
  headerTintColor: Colors.white,
  tabBarInactiveTintColor: Variables.colors.gray["400"],
};
