'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Flex, Text } from '@chakra-ui/react'
import { LuBookOpen, LuHouse, LuPlay, LuUserRound } from 'react-icons/lu'

const items = [
  { href: '/home', label: 'Home', icon: LuHouse },
  { href: '/conteudo', label: 'Conteúdo', icon: LuBookOpen },
  { href: '/midia', label: 'Mídia', icon: LuPlay },
  { href: '/perfil', label: 'Perfil', icon: LuUserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <Box
      position="fixed"
      bottom={0}
      insetX={0}
      zIndex={20}
      borderTop="1px solid"
      borderColor="brand.100"
      bg="surface"
      backdropFilter="blur(12px)"
    >
      <Flex justify="space-around" px={2} py={3}>
        {items.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <Link key={href} href={href} passHref>
              <Box
                as="a"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
                px={3}
                py={2}
                borderRadius="xl"
                color={isActive ? 'brand.700' : 'muted'}
                bg={isActive ? 'brand.50' : 'transparent'}
                transition="all 0.2s ease"
              >
                <Box as={Icon} fontSize="18px" />
                <Text fontSize="xs" fontWeight={600}>
                  {label}
                </Text>
              </Box>
            </Link>
          )
        })}
      </Flex>
    </Box>
  )
}
