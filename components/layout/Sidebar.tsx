'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { BookOpen, Gamepad2, GraduationCap, House, Info, Leaf, LogOut, Settings, Tv, Users } from 'lucide-react'

const items = [
  { href: '/home', label: 'Início', icon: House },
  { href: '/educacao', label: 'Educação', icon: GraduationCap },
  { href: '/cartilha', label: 'Cartilha', icon: BookOpen },
  { href: '/jogos', label: 'Jogos', icon: Gamepad2 },
  { href: '/midia', label: 'Na Mídia', icon: Tv },
  { href: '/equipe', label: 'Equipe', icon: Users },
  { href: '/sobre', label: 'Sobre', icon: Info },
]

const footerItems = [
  { href: '/perfil', label: 'Configurações', icon: Settings },
  { href: '/sair', label: 'Sair', icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Flex
      direction="column"
      justify="space-between"
      w="280px"
      h="100%"
      bg="white"
      borderRadius="2xl"
      py={6}
      boxShadow="sm"
    >
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
          {items.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link key={href} href={href} passHref>
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
                  _hover={{
                    bg: isActive ? 'primary.500' : 'primary.50',
                  }}
                >
                  <Box as={Icon} fontSize="18px" strokeWidth={2} />
                  <Text fontSize="15px">{label}</Text>
                </Flex>
              </Link>
            )
          })}
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
        {footerItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} passHref>
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
            >
              <Box as={Icon} fontSize="18px" strokeWidth={2} />
              <Text fontSize="15px">{label}</Text>
            </Flex>
          </Link>
        ))}
      </Stack>
    </Flex>
  )
}