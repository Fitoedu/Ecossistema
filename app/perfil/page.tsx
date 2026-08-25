'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Tabs,
} from '@chakra-ui/react'
import { GraduationCap, Settings, Trash2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useAuth } from '@/app/context/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { TAMANHOS_TEXTO } from './_data/perfil'

import { PerfilSection } from './components/PerfilSection'
import { AcessibilidadeSection } from './components/AcessibilidadeSection'
import { NotificacoesSection } from './components/NotificacoesSection'
import { AppInfoSection } from './components/AppInfoSection'
import { DeleteAccountModal } from './components/DeleteAccountModal'
import { CertificadosSection } from './components/CertificadosSection'

export default function Perfil() {
  const { user } = useAuth()
  const { profile, loading, updateProfile } = useProfile()

  // Tab ativa
  const [activeTab, setActiveTab] = useState('estudos')

  // Estado local inicializado a partir do profile do Supabase
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tamanhoTexto, setTamanhoTexto] = useState([1])
  const [altoContraste, setAltoContraste] = useState(false)
  const [notifPush, setNotifPush] = useState(true)
  const [notifEmail, setNotifEmail] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Popula formulário quando o perfil carrega
  useEffect(() => {
    if (!profile) return
    setNome(profile.name ?? '')
    setAltoContraste(profile.high_contrast)
    setNotifPush(profile.notif_push)
    setNotifEmail(profile.notif_email)
    const idx = ['sm', 'md', 'lg'].indexOf(profile.text_size)
    setTamanhoTexto([idx >= 0 ? idx : 1])
  }, [profile])

  useEffect(() => {
    if (user?.email) setEmail(user.email)
  }, [user])

  const tamanhoLabel = useMemo(() => TAMANHOS_TEXTO[tamanhoTexto[0]], [tamanhoTexto])

  async function handleSalvar() {
    setSalvando(true)
    try {
      await updateProfile({
        name: nome,
        high_contrast: altoContraste,
        notif_push: notifPush,
        notif_email: notifEmail,
        text_size: ['sm', 'md', 'lg'][tamanhoTexto[0]] ?? 'md',
      })
    } finally {
      setSalvando(false)
    }
  }

  if (loading) {
    return (
      <AppShell>
        <Flex justify="center" py={20}>
          <Spinner color="primary.500" size="xl" />
        </Flex>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Stack gap={6}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          pb={2}
          borderBottom="1px solid"
          borderColor="primary.100"
          wrap="wrap"
          gap={2}
        >
          <Heading as="h1" size="lg" color="primary.700">
            Meu Perfil
          </Heading>
        </Flex>

        <Tabs.Root
          value={activeTab}
          onValueChange={(d) => setActiveTab(d.value)}
          variant="enclosed"
          colorPalette="green"
        >
          <Tabs.List
            bg="surface"
            borderRadius="xl"
            border="1.5px solid"
            borderColor="primary.100"
            p={1}
            mb={6}
          >
            <Tabs.Trigger
              value="estudos"
              borderRadius="lg"
              fontWeight={600}
              fontSize="sm"
              px={4}
              py={2}
              gap={2}
              _selected={{
                bg: 'primary.500',
                color: 'white',
                boxShadow: '0 2px 8px rgba(46,125,50,0.25)',
              }}
              color="muted"
              transition="all 0.2s ease"
            >
              <GraduationCap size={16} />
              Meus Estudos & Certificados
            </Tabs.Trigger>

            <Tabs.Trigger
              value="config"
              borderRadius="lg"
              fontWeight={600}
              fontSize="sm"
              px={4}
              py={2}
              gap={2}
              _selected={{
                bg: 'primary.500',
                color: 'white',
                boxShadow: '0 2px 8px rgba(46,125,50,0.25)',
              }}
              color="muted"
              transition="all 0.2s ease"
            >
              <Settings size={16} />
              Configurações da Conta
            </Tabs.Trigger>
          </Tabs.List>

          {/* ── Aba 1: Estudos & Certificados ──────────────── */}
          <Tabs.Content value="estudos">
            <CertificadosSection />
          </Tabs.Content>

          {/* ── Aba 2: Configurações da Conta ──────────────── */}
          <Tabs.Content value="config">
            <Stack gap={6}>
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
          </Tabs.Content>
        </Tabs.Root>
      </Stack>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </AppShell>
  )
}
