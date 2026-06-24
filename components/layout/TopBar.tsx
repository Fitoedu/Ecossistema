'use client'

import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'

interface TopBarProps {
  title: string
  description?: string
}

export function TopBar({ title, description }: TopBarProps) {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: 6, md: 8, lg: 10 }}
      py={4}
      borderBottom="1px solid"
      borderColor="brand.100"
      bg="bg"
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
    >
      <Box>
        <Heading as="h1" size="md">
          {title}
        </Heading>
        {description ? (
          <Text color="muted" fontSize="sm" mt={1}>
            {description}
          </Text>
        ) : null}
      </Box>

      <ColorModeButton />
    </Flex>
  )
}
