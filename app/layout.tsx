import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import { Box } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

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
      { url: "/assets/joaninha_corpo_todo.webp", sizes: "192x192", type: "image/webp" },
      { url: "/assets/dona_fito_meio_corpo.webp", sizes: "512x512", type: "image/webp" },
    ],
    apple: [{ url: "/assets/joaninha_corpo_todo.webp", sizes: "180x180", type: "image/webp" }],
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
    { media: "(prefers-color-scheme: light)", color: "#2E7D32" },
    { media: "(prefers-color-scheme: dark)", color: "#225C28" },
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
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <body>
        <Provider>
          <ServiceWorkerRegister />
          <Box minH="100vh" bg="bg" color="fg">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  )
}