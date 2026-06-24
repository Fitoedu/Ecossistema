import type { Metadata, Viewport } from "next"
import { Box } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://educafito.vercel.app"),
  title: {
    default: "EducaFito",
    template: "%s | EducaFito",
  },
  description:
    "Plataforma educativa sobre plantas medicinais e práticas agrícolas para aprender com a natureza.",
  applicationName: "EducaFito",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/images/model.png", sizes: "192x192", type: "image/png" },
      { url: "/images/model.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/model.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "EducaFito",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "EducaFito",
    description: "Uma plataforma educativa voltada ao ensino de plantas medicinais e práticas agrícolas.",
    type: "website",
    locale: "pt_BR",
    siteName: "EducaFito",
  },
  twitter: {
    card: "summary_large_image",
    title: "EducaFito",
    description: "Uma plataforma educativa voltada ao ensino de plantas medicinais e práticas agrícolas.",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fcf9" },
    { media: "(prefers-color-scheme: dark)", color: "#07120d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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