'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Separator,
  Slider,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import {
  Accessibility,
  Bell,
  Check,
  ChevronRight,
  HelpCircle,
  Info,
  Mail,
  Smartphone,
  Trash2,
  UserRound,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'

const TAMANHOS_TEXTO = ['Pequeno', 'Médio', 'Grande']

interface SettingsCardProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

function SettingsCard({ icon: Icon, iconBg, iconColor, title, action, children }: SettingsCardProps) {
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

interface ToggleRowProps {
  icon: React.ElementType
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ icon: Icon, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <Flex align="flex-start" justify="space-between" gap={4}>
      <Flex align="flex-start" gap={3} flex={1}>
        <Box color="muted" mt="2px" flexShrink={0}>
          <Icon size={18} />
        </Box>
        <Box>
          <Text fontWeight={700} fontSize="sm" color="fg">
            {label}
          </Text>
          <Text fontSize="sm" color="muted" mt={0.5}>
            {description}
          </Text>
        </Box>
      </Flex>

      <Switch.Root
        checked={checked}
        onCheckedChange={(details) => onChange(!!details.checked)}
        colorPalette="primary"
        flexShrink={0}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb>
            {checked && (
              <Switch.ThumbIndicator>
                <Check size={11} color="var(--chakra-colors-primary-600)" strokeWidth={3} />
              </Switch.ThumbIndicator>
            )}
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Root>
    </Flex>
  )
}

interface InfoRowProps {
  label: string
  href?: string
  trailing?: React.ReactNode
}

function InfoRow({ label, href, trailing }: InfoRowProps) {
  const content = (
    <Flex align="center" justify="space-between" py={4}>
      <Text fontSize="sm" fontWeight={600} color="fg">
        {label}
      </Text>
      {trailing ?? (href && <ChevronRight size={18} color="var(--chakra-colors-muted)" />)}
    </Flex>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    )
  }

  return content
}

export default function Perfil() {
  const [nome, setNome] = useState('Estudante EducaFito')
  const [email, setEmail] = useState('estudante@educafito.org.br')
  const [tamanhoTexto, setTamanhoTexto] = useState([1])
  const [altoContraste, setAltoContraste] = useState(false)
  const [notifPush, setNotifPush] = useState(true)
  const [notifEmail, setNotifEmail] = useState(false)
  const [salvando, setSalvando] = useState(false)

  const tamanhoLabel = useMemo(() => TAMANHOS_TEXTO[tamanhoTexto[0]], [tamanhoTexto])

  function handleSalvar() {
    setSalvando(true)
    // Persistência ainda não implementada.
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

        <SettingsCard
          icon={UserRound}
          iconBg="primary.500"
          iconColor="white"
          title="Perfil"
          action={
            <Box
              as="button"
              onClick={handleSalvar}
              color="primary.700"
              fontWeight={700}
              fontSize="sm"
              opacity={salvando ? 0.6 : 1}
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </Box>
          }
        >
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight={700} color="fg" mb={2}>
                Nome Completo
              </Text>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                bg="bg"
                borderColor="primary.100"
              />
            </Box>
          </Flex>
        </SettingsCard>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={6} align="stretch">
          <Box flex={1}>
            <SettingsCard
              icon={Accessibility}
              iconBg="tertiary.500"
              iconColor="white"
              title="Acessibilidade"
            >
              <Stack gap={5}>
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="sm" fontWeight={700} color="fg">
                      Tamanho do Texto
                    </Text>
                    <Badge bg="bg" color="fg" borderRadius="full" px={3} py={1} fontWeight={600}>
                      {tamanhoLabel}
                    </Badge>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Text fontSize="sm" color="muted">
                      A
                    </Text>
                    <Slider.Root
                      value={tamanhoTexto}
                      onValueChange={(details) => setTamanhoTexto(details.value)}
                      min={0}
                      max={2}
                      step={1}
                      flex={1}
                    >
                      <Slider.Control>
                        <Slider.Track bg="primary.100">
                          <Slider.Range bg="primary.500" />
                        </Slider.Track>
                        <Slider.Thumbs
                          boxSize={4}
                          bg="primary.600"
                          borderWidth="2px"
                          borderColor="white"
                          boxShadow="0 1px 4px rgba(15,42,26,0.3)"
                        />
                      </Slider.Control>
                    </Slider.Root>
                    <Text fontSize="lg" fontWeight={700} color="fg">
                      A
                    </Text>
                  </Flex>
                </Box>

                <Separator borderColor="primary.100" />

                <ToggleRow
                  icon={Accessibility}
                  label="Alto Contraste"
                  description="Melhora a legibilidade com cores mais fortes."
                  checked={altoContraste}
                  onChange={setAltoContraste}
                />
              </Stack>
            </SettingsCard>
          </Box>

          <Box flex={1}>
            <SettingsCard
              icon={Bell}
              iconBg="secondary.100"
              iconColor="var(--chakra-colors-secondary-700)"
              title="Notificações"
            >
              <Stack gap={4} divideY="1px" css={{ '& > div': { borderColor: 'var(--chakra-colors-primary-100)' } }}>
                <ToggleRow
                  icon={Smartphone}
                  label="Notificações Push"
                  description="Avisos de novos módulos e conquistas na gamificação."
                  checked={notifPush}
                  onChange={setNotifPush}
                />
                <Box pt={4}>
                  <ToggleRow
                    icon={Mail}
                    label="Atualizações por E-mail"
                    description="Novidades sobre educação fitossanitária."
                    checked={notifEmail}
                    onChange={setNotifEmail}
                  />
                </Box>
              </Stack>
            </SettingsCard>
          </Box>
        </Flex>

        <SettingsCard icon={Info} iconBg="neutral.200" iconColor="var(--chakra-colors-neutral-800)" title="Informações do App">
          <Stack gap={0} divideY="1px" css={{ '& > *': { borderColor: 'var(--chakra-colors-primary-100)' } }}>
            <InfoRow label="Termos de Uso" href="/termos" />
            <InfoRow label="Política de Privacidade" href="/privacidade" />
            <InfoRow
              label="Versão"
              trailing={
                <Badge bg="bg" color="muted" borderRadius="full" px={3} py={1} fontWeight={600}>
                  v0.0.1 (Test Flight)
                </Badge>
              }
            />
          </Stack>
        </SettingsCard>

        <Flex justify="center" pt={2} pb={6}>
          <Flex
            as="button"
            align="center"
            gap={2}
            color="red.600"
            fontWeight={700}
            fontSize="sm"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            <Trash2 size={17} />
            Excluir Conta
          </Flex>
        </Flex>
      </Stack>
    </AppShell>
  )
}