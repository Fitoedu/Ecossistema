'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  DrawerRoot,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerCloseTrigger,
} from '@chakra-ui/react'
import {
  BookOpen,
  Gamepad2,
  GraduationCap,
  Info,
  Leaf,
  LogOut,
  Menu,
  Settings,
  Tv,
  Users,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Dados de navegação ────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: '/educacao', label: 'Educação',  icon: GraduationCap },
  { href: '/cartilha', label: 'Cartilha',  icon: BookOpen },
  { href: '/jogos',    label: 'Jogos',     icon: Gamepad2 },
  { href: '/midia',    label: 'Na Mídia',  icon: Tv },
  { href: '/equipe',   label: 'Equipe',    icon: Users },
  { href: '/sobre',    label: 'Sobre',     icon: Info },
] as const

const FOOTER_ITEMS = [
  { href: '/perfil', label: 'Configurações', icon: Settings },
  { href: '/sair',   label: 'Sair',          icon: LogOut },
] as const

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  href: string
  label: string
  icon: React.ElementType
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link href={href} passHref onClick={onClick}>
      <Flex
        align="center"
        gap={3}
        px={4}
        py={3}
        borderRadius="xl"
        bg={isActive ? 'primary.500' : 'transparent'}
        color={isActive ? 'white' : 'fg'}
        fontWeight={isActive ? 600 : 500}
        transition="all 0.2s ease"
        _hover={{ bg: isActive ? 'primary.500' : 'primary.50' }}
        // Touch target mínimo
        minH="44px"
      >
        <Box as={Icon} fontSize="18px" strokeWidth={2} flexShrink={0} />
        <Text fontSize="15px">{label}</Text>
      </Flex>
    </Link>
  )
}

// ─── SidebarContent ──────────────────────────────────────────────────────────
// Conteúdo reutilizável entre a sidebar fixa e o drawer mobile

function SidebarContent({
  pathname,
  onNav,
}: {
  pathname: string
  onNav?: () => void
}) {
  return (
    <Flex direction="column" justify="space-between" h="100%" py={6}>
      {/* Topo: logo + navegação */}
      <Stack gap={8} px={5}>
        <Flex align="center" gap={3}>
          <Flex
            w="40px"
            h="40px"
            borderRadius="full"
            bg="primary.500"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Box as={Leaf} color="white" fontSize="20px" />
          </Flex>
          <Box>
            <Heading as="h1" size="sm" color="fg" lineHeight={1.2}>
              EducaFito
            </Heading>
            <Text fontSize="11px" color="muted" lineHeight={1.3}>
              Ecossistema Digital de Educação
            </Text>
          </Box>
        </Flex>

        <Stack gap={1}>
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              isActive={pathname === href || pathname.startsWith(`${href}/`)}
              onClick={onNav}
            />
          ))}
        </Stack>
      </Stack>

      {/* Rodapé: configurações e sair */}
      <Stack
        gap={1}
        px={5}
        pt={4}
        borderTop="1px dashed"
        borderColor="primary.100"
      >
        {FOOTER_ITEMS.map(({ href, label, icon }) => (
          <Link key={href} href={href} passHref onClick={onNav}>
            <Flex
              align="center"
              gap={3}
              px={4}
              py={2}
              borderRadius="xl"
              color="muted"
              fontWeight={500}
              transition="all 0.2s ease"
              _hover={{ bg: 'primary.50', color: 'fg' }}
              minH="44px"
            >
              <Box as={icon} fontSize="18px" strokeWidth={2} flexShrink={0} />
              <Text fontSize="15px">{label}</Text>
            </Flex>
          </Link>
        ))}
      </Stack>
    </Flex>
  )
}

// ─── Sidebar fixa — apenas desktop ────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Box
      w="280px"
      h="100%"
      bg="white"
      borderRadius="2xl"
      boxShadow="sm"
      flexShrink={0}
      // Oculta em mobile, visível a partir de md
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent pathname={pathname} />
    </Box>
  )
}

// ─── MobileHeader — barra superior com hambúrguer ─────────────────────────────

export function MobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      {/* Barra superior — apenas mobile */}
      <Flex
        as="header"
        display={{ base: 'flex', md: 'none' }}
        align="center"
        justify="space-between"
        px={4}
        py={3}
        bg="white"
        borderBottom="1px solid"
        borderColor="primary.100"
        position="sticky"
        top={0}
        zIndex={40}
        boxShadow="0 1px 8px rgba(0,0,0,0.06)"
      >
        {/* Logo compacto */}
        <Flex align="center" gap={2}>
          <Flex
            w="32px"
            h="32px"
            borderRadius="full"
            bg="primary.500"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Box as={Leaf} color="white" fontSize="16px" />
          </Flex>
          <Heading as="span" size="sm" color="fg" lineHeight={1.2} fontSize="15px">
            EducaFito
          </Heading>
        </Flex>

        {/* Botão hambúrguer */}
        <Box
          as="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
          w="40px"
          h="40px"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="primary.50"
          color="primary.600"
          border="1px solid"
          borderColor="primary.100"
          cursor="pointer"
          _hover={{ bg: 'primary.100' }}
          transition="background 0.2s"
        >
          <Box as={Menu} fontSize="20px" strokeWidth={2} />
        </Box>
      </Flex>

      {/* Drawer via portal para mobile */}
      <DrawerRoot
        open={open}
        onOpenChange={(d) => { if (!d.open) close() }}
        placement="start"
      >
        <DrawerBackdrop bg="blackAlpha.500" backdropFilter="blur(4px)" />
        <DrawerPositioner>
          <DrawerContent
            id="mobile-drawer"
            w="280px"
            maxW="85vw"
            bg="white"
            boxShadow="xl"
          >
            {/* Cabeçalho do drawer com botão fechar */}
            <Flex
              align="center"
              justify="space-between"
              px={5}
              pt={5}
              pb={3}
              borderBottom="1px solid"
              borderColor="primary.50"
            >
              <Flex align="center" gap={2}>
                <Flex
                  w="32px" h="32px"
                  borderRadius="full"
                  bg="primary.500"
                  align="center" justify="center"
                  flexShrink={0}
                >
                  <Box as={Leaf} color="white" fontSize="16px" />
                </Flex>
                <Text fontWeight={700} fontSize="15px" color="fg">EducaFito</Text>
              </Flex>
              <DrawerCloseTrigger asChild>
                <Box
                  as="button"
                  aria-label="Fechar menu"
                  w="36px" h="36px"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.100"
                  cursor="pointer"
                  _hover={{ bg: 'gray.200' }}
                  transition="background 0.2s"
                >
                  <Box as={X} fontSize="18px" strokeWidth={2} />
                </Box>
              </DrawerCloseTrigger>
            </Flex>

            {/* Conteúdo de navegação */}
            <SidebarContent pathname={pathname} onNav={close} />
          </DrawerContent>
        </DrawerPositioner>
      </DrawerRoot>
    </>
  )
}