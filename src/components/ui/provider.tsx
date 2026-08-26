"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "@/components/ui/color-mode"
import { system } from "@/theme"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="light" enableSystem={false}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}