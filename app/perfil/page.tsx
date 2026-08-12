'use client'

import { useMemo, useState } from 'react'
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'

import {
  INITIAL_USER_SETTINGS,
  TAMANHOS_TEXTO,
} from './_data/perfil'

import { PerfilSection } from './components/PerfilSection'
import { AcessibilidadeSection } from './components/AcessibilidadeSection'
import { NotificacoesSection } from './components/NotificacoesSection'
import { AppInfoSection } from './components/AppInfoSection'
import { DeleteAccountModal } from './components/DeleteAccountModal'

export default function Perfil() {
  const [nome, setNome] = useState(INITIAL_USER_SETTINGS.nome)
  const [email, setEmail] = useState(INITIAL_USER_SETTINGS.email)
  const [tamanhoTexto, setTamanhoTexto] = useState(INITIAL_USER_SETTINGS.tamanhoTexto)
  const [altoContraste, setAltoContraste] = useState(INITIAL_USER_SETTINGS.altoContraste)
  const [notifPush, setNotifPush] = useState(INITIAL_USER_SETTINGS.notifPush)
  const [notifEmail, setNotifEmail] = useState(INITIAL_USER_SETTINGS.notifEmail)
  const [salvando, setSalvando] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const tamanhoLabel = useMemo(() => TAMANHOS_TEXTO[tamanhoTexto[0]], [tamanhoTexto])

  function handleSalvar() {
    setSalvando(true)
    setTimeout(() => setSalvando(false), 900)
  }

  return (
    <AppShell>
      <Stack gap={6}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          pb={4}
          borderBottom="1px solid"
          borderColor="primary.100"
        >
          <Heading as="h1" size="lg" color="primary.700">
            Configurações
          </Heading>
        </Flex>

        <PerfilSection
          nome={nome}
          email={email}
          salvando={salvando}
          onNomeChange={setNome}
          onEmailChange={setEmail}
          onSalvar={handleSalvar}
        />

        <Flex direction={{ base: 'column', lg: 'row' }} gap={6} align="stretch">
          <Box flex={1}>
            <AcessibilidadeSection
              tamanhoTexto={tamanhoTexto}
              tamanhoLabel={tamanhoLabel}
              altoContraste={altoContraste}
              onTamanhoChange={setTamanhoTexto}
              onAltoContrasteChange={setAltoContraste}
            />
          </Box>

          <Box flex={1}>
            <NotificacoesSection
              notifPush={notifPush}
              notifEmail={notifEmail}
              onNotifPushChange={setNotifPush}
              onNotifEmailChange={setNotifEmail}
            />
          </Box>
        </Flex>

        <AppInfoSection />

        <Flex justify="center" pt={2} pb={6}>
          <Button
            variant="ghost"
            colorPalette="red"
            color="red.600"
            fontWeight={700}
            fontSize="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 size={17} />
            Excluir Conta
          </Button>
        </Flex>
      </Stack>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </AppShell>
  )
}