import { Box, Flex } from '@chakra-ui/react'
import { Sidebar, MobileHeader } from './Sidebar'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppShellProps {
  title?: string
  description?: string
  children: React.ReactNode
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

/**
 * Layout raiz da aplicação.
 *
 * Desktop (≥ md / 768px):
 *   ┌──────────┬───────────────────────────────────────┐
 *   │ Sidebar  │  Conteúdo  (px 8–10, py 8)            │
 *   │  280px   │                                       │
 *   └──────────┴───────────────────────────────────────┘
 *
 * Mobile (< md / 768px):
 *   ┌───────────────────────────────────────────────────┐
 *   │  MobileHeader (sticky top, hambúrguer → Drawer)   │
 *   ├───────────────────────────────────────────────────┤
 *   │  Conteúdo  (w=100%, px 0, py 0)                   │
 *   └───────────────────────────────────────────────────┘
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <Box
      minH="100dvh"
      bg="bg"
      color="fg"
    >
      {/* Barra superior com hambúrguer — visível apenas em mobile */}
      <MobileHeader />

      <Flex minH={{ base: 'auto', md: '100dvh' }}>
        {/* Sidebar fixa — oculta em mobile (o display:none está no próprio componente) */}
        <Box flexShrink={0} py={{ md: 4 }} pl={{ md: 4 }}>
          <Sidebar />
        </Box>

        {/* Área de conteúdo principal */}
        <Box
          as="div"
          flex={1}
          minW={0}  /* evita overflow horizontal em flex containers */
          // Em mobile: sem padding lateral (a cartilha gerencia seu próprio px)
          // Em desktop: padding generoso
          px={{ base: 0, md: 8, lg: 10 }}
          py={{ base: 0, md: 8 }}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  )
}