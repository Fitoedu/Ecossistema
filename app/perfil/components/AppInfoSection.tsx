'use client'

import { Badge, Stack } from '@chakra-ui/react'
import { Info } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { InfoRow } from './InfoRow'
import { APP_INFO_LINKS, APP_VERSION } from '../_data/perfil'

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
        {APP_INFO_LINKS.map((item) => (
          <InfoRow key={item.label} label={item.label} href={item.href} />
        ))}
        <InfoRow
          label="Versão"
          trailing={
            <Badge bg="bg" color="muted" borderRadius="full" px={3} py={1} fontWeight={600}>
              {APP_VERSION}
            </Badge>
          }
        />
      </Stack>
    </SettingsCard>
  )
}