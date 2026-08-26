'use client'

import { Box, Flex, Heading } from '@chakra-ui/react'

export interface SettingsCardProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function SettingsCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  action,
  children,
}: SettingsCardProps) {
  return (
    <Box
      as="section"
      bg="surface"
      borderWidth="1px"
      borderColor="primary.100"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      boxShadow="0 2px 12px rgba(15,42,26,0.05)"
    >
      <Flex align="center" justify="space-between" mb={5}>
        <Flex align="center" gap={3}>
          <Flex
            w="40px"
            h="40px"
            borderRadius="full"
            bg={iconBg}
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Icon size={18} color={iconColor} />
          </Flex>
          <Heading as="h2" size="md" color="fg">
            {title}
          </Heading>
        </Flex>
        {action}
      </Flex>
      {children}
    </Box>
  )
}