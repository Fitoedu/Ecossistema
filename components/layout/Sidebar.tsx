'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { LuBookOpen, LuHouse, LuPlay, LuUserRound } from 'react-icons/lu'

const items = [
  { href: '/home', label: 'Início', icon: LuHouse },
  { href: '/conteudo', label: 'Conteúdo', icon: LuBookOpen },
  { href: '/cartilha', label: 'Cartilha', icon: LuBookOpen },
  { href: '/midia', label: 'Mídia', icon: LuPlay },
  { href: '/perfil', label: 'Perfil', icon: LuUserRound },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <Box
      w="280px"
      borderRight="1px solid"
      borderColor="brand.100"
      bg="surface"
      px={6}
      py={8}
    >
      <Stack gap={6}>
        <Box>
          <Text fontSize="sm" fontWeight={700} color="brand.600" letterSpacing="0.08em" textTransform="uppercase">
            EducaFito
          </Text>
          <Heading as="h2" size="md" mt={2}>
            Aprendizado guiado
          </Heading>
          <Text color="muted" fontSize="sm" mt={2}>
            Uma jornada leve para conteúdos, mídia e progresso.
          </Text>
        </Box>

        <Stack gap={2}>
          {items.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link key={href} href={href} passHref>
                <Box
                  as="a"
                  display="flex"
                  alignItems="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="xl"
                  bg={isActive ? 'brand.50' : 'transparent'}
                  color={isActive ? 'brand.700' : 'fg'}
                  transition="all 0.2s ease"
                  _hover={{ bg: 'brand.50', color: 'brand.700' }}
                >
                  <Box as={Icon} fontSize="18px" />
                  <Text fontWeight={600}>{label}</Text>
                </Box>
              </Link>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
