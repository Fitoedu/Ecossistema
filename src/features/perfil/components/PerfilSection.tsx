'use client'

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { UserRound } from 'lucide-react'
import { SettingsCard } from './SettingsCard'

interface PerfilSectionProps {
  nome: string
  email: string
  salvando: boolean
  onNomeChange: (val: string) => void
  onEmailChange: (val: string) => void
  onSalvar: () => void
}

export function PerfilSection({
  nome,
  email,
  salvando,
  onNomeChange,
  onEmailChange,
  onSalvar,
}: PerfilSectionProps) {
  return (
    <SettingsCard
      icon={UserRound}
      iconBg="primary.500"
      iconColor="white"
      title="Perfil"
      action={
        <Button
          variant="ghost"
          colorPalette="primary"
          color="primary.700"
          fontWeight={700}
          fontSize="sm"
          onClick={onSalvar}
          loading={salvando}
          loadingText="Salvando..."
        >
          Salvar
        </Button>
      }
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight={700} color="fg" mb={2}>
            Nome Completo
          </Text>
          <Input
            value={nome}
            onChange={(e) => onNomeChange(e.target.value)}
            bg="bg"
            borderColor="primary.100"
          />
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight={700} color="fg" mb={2}>
            E-mail
          </Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            bg="bg"
            borderColor="primary.100"
          />
        </Box>
      </Flex>
    </SettingsCard>
  )
}