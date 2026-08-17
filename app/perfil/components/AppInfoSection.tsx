'use client'

import { Badge, Flex, Stack, Text } from '@chakra-ui/react'
import { Info } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { APP_VERSION } from '../_data/perfil'

export function AppInfoSection() {
  return (
    <SettingsCard
      icon={Info}
      iconBg="neutral.200"
      iconColor="var(--chakra-colors-neutral-800)"
      title="Informações do App"
    >
      <Stack
        gap={0}
        divideY="1px"
        css={{ '& > *': { borderColor: 'var(--chakra-colors-primary-100)' } }}
      >
        <Flex align="center" justify="space-between" py={4}>
          <Text fontSize="sm" fontWeight={600} color="fg">
            Versão
          </Text>

          <Badge bg="bg" color="muted" borderRadius="full" px={3} py={1} fontWeight={600}>
            {APP_VERSION}
          </Badge>
        </Flex>
      </Stack>
    </SettingsCard>
  )
}