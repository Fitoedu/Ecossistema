'use client'

import { Box, Stack } from '@chakra-ui/react'
import { Bell, Mail, Smartphone } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { ToggleRow } from './ToggleRow'

interface NotificacoesSectionProps {
  notifPush: boolean
  notifEmail: boolean
  onNotifPushChange: (val: boolean) => void
  onNotifEmailChange: (val: boolean) => void
}

export function NotificacoesSection({
  notifPush,
  notifEmail,
  onNotifPushChange,
  onNotifEmailChange,
}: NotificacoesSectionProps) {
  return (
    <SettingsCard
      icon={Bell}
      iconBg="secondary.100"
      iconColor="var(--chakra-colors-secondary-700)"
      title="Notificações"
    >
      <Stack
        gap={4}
        divideY="1px"
        css={{ '& > div': { borderColor: 'var(--chakra-colors-primary-100)' } }}
      >
        <ToggleRow
          icon={Smartphone}
          label="Notificações Push"
          description="Avisos de novos módulos e conquistas na gamificação."
          checked={notifPush}
          onChange={onNotifPushChange}
        />
        <Box pt={4}>
          <ToggleRow
            icon={Mail}
            label="Atualizações por E-mail"
            description="Novidades sobre educação fitossanitária."
            checked={notifEmail}
            onChange={onNotifEmailChange}
          />
        </Box>
      </Stack>
    </SettingsCard>
  )
}