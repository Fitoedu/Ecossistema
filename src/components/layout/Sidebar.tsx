'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Menu,
  Portal,
} from '@chakra-ui/react'
import {
  BookOpen,
  Gamepad2,
  GraduationCap,
  Info,
  Leaf,
  LogIn,
  LogOut,
  MoreHorizontal,
  Settings,
  Tv,
  Users,
} from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'

const items = [
  { href: '/educacao', label: 'Educação', icon: GraduationCap },
  { href: '/cartilha', label: 'Cartilha', icon: BookOpen },
  { href: '/jogos', label: 'Jogos', icon: Gamepad2 },
  { href: '/midia', label: 'Na Mídia', icon: Tv },
  { href: '/equipe', label: 'Equipe', icon: Users },
  { href: '/sobre', label: 'Sobre', icon: Info },
]

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

// Altura da bottom nav — usada tanto na nav quanto no padding do conteúdo
export const MOBILE_NAV_HEIGHT = '72px'

export function Sidebar() {
  return (
    <>
      <Box display={{ base: 'none', md: 'block' }} h="100%">
        <DesktopSidebar />
      </Box>

      <Box display={{ base: 'block', md: 'none' }}>
        <MobileBottomNav />
      </Box>
    </>
  )
}

function DesktopSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const userName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || null

  return (
    <Flex
      as="nav"
      aria-label="Navegação principal"
      direction="column"
      justify="space-between"
      w="280px"
      h="100%"
      bg="white"
      borderRadius="2xl"
      py={6}
      boxShadow="sm"
    >
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
          {items.map(({ href, label, icon: Icon }) => {
            const isActive = isRouteActive(pathname, href)

            return (
              <Link key={href} href={href}>
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  minH="44px"
                  borderRadius="xl"
                  bg={isActive ? 'primary.500' : 'transparent'}
                  color={isActive ? 'white' : 'fg'}
                  fontWeight={isActive ? 600 : 500}
                  transition="all 0.2s ease"
                  aria-current={isActive ? 'page' : undefined}
                  _hover={{
                    bg: isActive ? 'primary.500' : 'primary.50',
                  }}
                >
                  <Box as={Icon} fontSize="18px" strokeWidth={2} aria-hidden />
                  <Text fontSize="15px">{label}</Text>
                </Flex>
              </Link>
            )
          })}
        </Stack>
      </Stack>

      <Stack
        gap={1}
        px={5}
        pt={4}
        borderTop="1px dashed"
        borderColor="primary.100"
      >
        {/* Info do Usuário Logado */}
        {user && (
          <Box px={4} py={2} mb={1} bg="neutral.50" borderRadius="lg">
            <Text fontSize="2xs" color="muted" textTransform="uppercase" fontWeight={600} letterSpacing="wider">
              Conectado como
            </Text>
            <Text fontSize="xs" fontWeight={700} color="primary.800" truncate>
              {userName || user.email}
            </Text>
          </Box>
        )}

        {/* Link Configurações */}
        <Link href="/perfil">
          <Flex
            align="center"
            gap={3}
            px={4}
            py={2.5}
            minH="44px"
            borderRadius="xl"
            color={isRouteActive(pathname, '/perfil') ? 'primary.700' : 'muted'}
            bg={isRouteActive(pathname, '/perfil') ? 'primary.50' : 'transparent'}
            fontWeight={isRouteActive(pathname, '/perfil') ? 700 : 500}
            transition="all 0.2s ease"
            aria-current={isRouteActive(pathname, '/perfil') ? 'page' : undefined}
            _hover={{ bg: 'primary.50', color: 'fg' }}
          >
            <Box as={Settings} fontSize="18px" strokeWidth={2} aria-hidden />
            <Text fontSize="15px">Configurações</Text>
          </Flex>
        </Link>

        {/* Botão Sair / Entrar */}
        {user ? (
          <Flex
            as="button"
            onClick={() => signOut()}
            align="center"
            gap={3}
            px={4}
            py={2.5}
            minH="44px"
            borderRadius="xl"
            color="red.600"
            fontWeight={500}
            transition="all 0.2s ease"
            cursor="pointer"
            w="100%"
            textAlign="left"
            _hover={{ bg: 'red.50', color: 'red.700' }}
          >
            <Box as={LogOut} fontSize="18px" strokeWidth={2} aria-hidden />
            <Text fontSize="15px">Sair</Text>
          </Flex>
        ) : (
          <Link href="/login">
            <Flex
              align="center"
              gap={3}
              px={4}
              py={2.5}
              minH="44px"
              borderRadius="xl"
              color="primary.700"
              fontWeight={600}
              transition="all 0.2s ease"
              _hover={{ bg: 'primary.50', color: 'primary.800' }}
            >
              <Box as={LogIn} fontSize="18px" strokeWidth={2} aria-hidden />
              <Text fontSize="15px">Entrar</Text>
            </Flex>
          </Link>
        )}
      </Stack>
    </Flex>
  )
}

function MobileBottomNav() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const mobilePrimaryItems = items.slice(0, 4)
  const mobileMoreExtraItems = items.slice(4) // Equipe, Sobre

  const isMoreActive =
    mobileMoreExtraItems.some(({ href }) => isRouteActive(pathname, href)) ||
    isRouteActive(pathname, '/perfil')

  return (
    <Flex
      as="nav"
      aria-label="Navegação principal"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={50}
      bg="white"
      borderTopRadius="2xl"
      boxShadow="0 -2px 12px rgba(0,0,0,0.08)"
      px={1}
      justify="space-between"
      align="center"
      h={MOBILE_NAV_HEIGHT}
      pb="env(safe-area-inset-bottom)"
    >
      {mobilePrimaryItems.map(({ href, label, icon: Icon }) => {
        const isActive = isRouteActive(pathname, href)

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap={1}
              minW="48px"
              minH="48px"
              px={isActive ? 4 : 2}
              borderRadius="full"
              bg={isActive ? 'primary.100' : 'transparent'}
              color={isActive ? 'primary.700' : 'muted'}
              transition="all 0.2s ease"
              _active={{ bg: 'primary.100' }}
            >
              <Box as={Icon} fontSize="20px" strokeWidth={2} aria-hidden />
              <Text fontSize="11px" fontWeight={isActive ? 700 : 500}>
                {label}
              </Text>
            </Flex>
          </Link>
        )
      })}

      <Menu.Root>
        <Menu.Trigger asChild>
          <Flex
            as="button"
            aria-label="Mais opções de navegação"
            direction="column"
            align="center"
            justify="center"
            gap={1}
            flex={1}
            minW="48px"
            minH="48px"
            borderRadius="full"
            bg={isMoreActive ? 'primary.100' : 'transparent'}
            color={isMoreActive ? 'primary.700' : 'muted'}
            _active={{ bg: 'primary.100' }}
          >
            <Box as={MoreHorizontal} fontSize="20px" strokeWidth={2} aria-hidden />
            <Text fontSize="11px" fontWeight={isMoreActive ? 700 : 500}>
              Mais
            </Text>
          </Flex>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content borderRadius="xl" boxShadow="lg" minW="220px">
              {mobileMoreExtraItems.map(({ href, label, icon: Icon }) => (
                <Menu.Item key={href} value={href} asChild>
                  <Link
                    href={href}
                    aria-current={isRouteActive(pathname, href) ? 'page' : undefined}
                  >
                    <Flex align="center" gap={3} px={2} py={2} minH="44px">
                      <Box as={Icon} fontSize="18px" strokeWidth={2} aria-hidden />
                      <Text fontSize="14px">{label}</Text>
                    </Flex>
                  </Link>
                </Menu.Item>
              ))}

              <Menu.Item value="/perfil" asChild>
                <Link
                  href="/perfil"
                  aria-current={isRouteActive(pathname, '/perfil') ? 'page' : undefined}
                >
                  <Flex align="center" gap={3} px={2} py={2} minH="44px">
                    <Box as={Settings} fontSize="18px" strokeWidth={2} aria-hidden />
                    <Text fontSize="14px">Configurações</Text>
                  </Flex>
                </Link>
              </Menu.Item>

              {user ? (
                <Menu.Item
                  value="sair"
                  onClick={() => signOut()}
                  color="red.600"
                  cursor="pointer"
                >
                  <Flex align="center" gap={3} px={2} py={2} minH="44px" color="red.600" w="100%">
                    <Box as={LogOut} fontSize="18px" strokeWidth={2} aria-hidden />
                    <Text fontSize="14px" fontWeight={600}>
                      Sair da Conta
                    </Text>
                  </Flex>
                </Menu.Item>
              ) : (
                <Menu.Item value="/login" asChild>
                  <Link href="/login">
                    <Flex align="center" gap={3} px={2} py={2} minH="44px" color="primary.700">
                      <Box as={LogIn} fontSize="18px" strokeWidth={2} aria-hidden />
                      <Text fontSize="14px" fontWeight={600}>
                        Entrar
                      </Text>
                    </Flex>
                  </Link>
                </Menu.Item>
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  )
}