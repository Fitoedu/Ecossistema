import type { Metadata } from "next"
import { Box } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"

export const metadata: Metadata = {
  title: "FitoEdu — Aprenda com a natureza",
  description:
    "Plataforma educativa sobre plantas medicinais. Aprendendo com a natureza, crescendo com o conhecimento.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <Box minH="100vh" bg="bg" color="fg">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  )
}