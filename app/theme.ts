import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#ecfdf5" },
          100: { value: "#d1fae5" },
          200: { value: "#a7f3d0" },
          300: { value: "#6ee7b7" },
          400: { value: "#34d399" },
          500: { value: "#10b981" },
          600: { value: "#059669" },
          700: { value: "#047857" },
          800: { value: "#065f46" },
          900: { value: "#064e3b" },
          950: { value: "#022c22" },
        },
      },
      fonts: {
        heading: { value: '"Inter", "Geist", system-ui, sans-serif' },
        body:    { value: '"Inter", "Geist", system-ui, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        // Cor de destaque padrão em toda a app
        accent: {
          default:  { value: "{colors.brand.500}" },
          _dark:    { value: "{colors.brand.400}" },
        },
        // Fundo geral
        bg: {
          default: { value: "{colors.white}" },
          _dark:   { value: "#0f1a14" },
        },
        // Superfície de cards / painéis
        surface: {
          default: { value: "{colors.brand.50}" },
          _dark:   { value: "#132216" },
        },
        // Texto principal
        fg: {
          default: { value: "{colors.gray.800}" },
          _dark:   { value: "{colors.brand.100}" },
        },
      },
    },
  },
  globalCss: {
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
  },
})

export const system = createSystem(defaultConfig, config)
