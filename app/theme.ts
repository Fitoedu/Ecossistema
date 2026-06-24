import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const tokens = {
  colors: {
    brand: {
      50: { value: "#f5fbf6" },
      100: { value: "#e2f2e6" },
      200: { value: "#c5e4ce" },
      300: { value: "#8ec8a1" },
      400: { value: "#4ea56d" },
      500: { value: "#0f6b3d" },
      600: { value: "#0b5330" },
      700: { value: "#083f25" },
      800: { value: "#062d1b" },
      900: { value: "#041d13" },
      950: { value: "#02140c" },
    },
    blue: {
      500: { value: "#004ea1" },
      600: { value: "#003e84" },
    },
    gold: {
      400: { value: "#fcbf49" },
      500: { value: "#f4b000" },
    },
  },
  fonts: {
    heading: { value: '"Poppins", "Inter", system-ui, sans-serif' },
    body: { value: '"Poppins", "Inter", system-ui, sans-serif' },
  },
}

const semanticTokens = {
  colors: {
    accent: {
      default: { value: "{colors.gold.500}" },
      _dark: { value: "{colors.gold.400}" },
    },
    bg: {
      default: { value: "#f8fcf9" },
      _dark: { value: "#07120d" },
    },
    surface: {
      default: { value: "#ffffff" },
      _dark: { value: "#12261b" },
    },
    fg: {
      default: { value: "#1b3327" },
      _dark: { value: "#eef8f1" },
    },
    muted: {
      default: { value: "#5c746d" },
      _dark: { value: "#9ab0a2" },
    },
  },
}

const globalCss = {
  "*": {
    boxSizing: "border-box",
  },
  html: {
    height: "100%",
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
