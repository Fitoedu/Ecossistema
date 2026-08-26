import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const tokens = {
  colors: {
    primary: {
      50: { value: "#eef8ef" },
      100: { value: "#d7ebd8" },
      200: { value: "#bce0bf" },
      300: { value: "#9ed3a2" },
      400: { value: "#7ec684" },
      500: { value: "#2E7D32" },
      600: { value: "#2A7130" },
      700: { value: "#225C28" },
      800: { value: "#1B4A1F" },
      900: { value: "#153B19" },
      950: { value: "#0f2812" },
    },
    secondary: {
      50: { value: "#f1faf1" },
      100: { value: "#dcf0dd" },
      200: { value: "#c2e5c4" },
      300: { value: "#a3d8a6" },
      400: { value: "#85cb89" },
      500: { value: "#66BB6A" },
      600: { value: "#549f58" },
      700: { value: "#438047" },
      800: { value: "#336335" },
      900: { value: "#244725" },
      950: { value: "#162c16" },
    },
    tertiary: {
      50: { value: "#eaf2fb" },
      100: { value: "#c9ddf4" },
      200: { value: "#a0c5ec" },
      300: { value: "#73a8e0" },
      400: { value: "#4989d0" },
      500: { value: "#1565C0" },
      600: { value: "#125aa9" },
      700: { value: "#0f4a8c" },
      800: { value: "#0c3b70" },
      900: { value: "#092c54" },
      950: { value: "#061c38" },
    },
    accent: {
      50: { value: "#fef9e8" },
      100: { value: "#fcefc0" },
      200: { value: "#f9e08a" },
      300: { value: "#f7d25a" },
      400: { value: "#f5c83a" },
      500: { value: "#FBC02D" },
      600: { value: "#d9a71b" },
      700: { value: "#b68213" },
      800: { value: "#8f6410" },
      900: { value: "#6f4d0c" },
      950: { value: "#4a3407" },
    },
    neutral: {
      0: { value: "#ffffff" },
      50: { value: "#F5F7F4" },
      100: { value: "#EBEDEB" },
      200: { value: "#D6D9D8" },
      300: { value: "#C1C6C5" },
      400: { value: "#ADB2B2" },
      500: { value: "#989E9F" },
      600: { value: "#838B8D" },
      700: { value: "#6E777A" },
      800: { value: "#5A6367" },
      900: { value: "#263238" },
      950: { value: "#1A2226" },
    },
  },
  fonts: {
    heading: { value: "var(--font-poppins), system-ui, sans-serif" },
    body: { value: "var(--font-poppins), system-ui, sans-serif" },
  },
}

const semanticTokens = {
  colors: {
    primary: {
      default: { value: "{colors.primary.500}" },
    },
    secondary: {
      default: { value: "{colors.secondary.500}" },
    },
    tertiary: {
      default: { value: "{colors.tertiary.500}" },
    },
    accent: {
      default: { value: "{colors.accent.500}" },
    },
    bg: {
      default: { value: "{colors.neutral.50}" },
    },
    surface: {
      default: { value: "{colors.neutral.0}" },
    },
    fg: {
      default: { value: "{colors.neutral.900}" },
    },
    muted: {
      default: { value: "{colors.neutral.600}" },
    },
    border: {
      default: { value: "{colors.neutral.200}" },
    },
  },
}

const globalCss = {
  "*": {
    boxSizing: "border-box",
  },
  html: {
    height: "100%",
    colorScheme: "light",
  },
  body: {
    margin: 0,
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    bg: "bg",
    color: "fg",
    fontFamily: "body",
  },
}

const config = defineConfig({
  theme: {
    tokens,
    semanticTokens,
  },
  globalCss,
})

export const system = createSystem(defaultConfig, config)