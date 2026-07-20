'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { BookOpen, House, Play, UserRound } from 'lucide-react'

const items = [
  { href: '/home', label: 'Início', icon: House },
  { href: '/conteudo', label: 'Conteúdo', icon: BookOpen },
  { href: '/cartilha', label: 'Cartilha', icon: BookOpen },
  { href: '/midia', label: 'Mídia', icon: Play },
  { href: '/perfil', label: 'Perfil', icon: UserRound },
  { href: '/sobre', label: 'Sobre', icon: UserRound },
  { href: '/jogos', label: 'Jogos', icon: UserRound },
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
